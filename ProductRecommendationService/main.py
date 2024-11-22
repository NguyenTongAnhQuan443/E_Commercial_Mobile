from sqlalchemy import create_engine
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Connect to the database
engine = create_engine('mysql+pymysql://root:sapassword@localhost:3306/ecommerce')

# Load the data from the database
query = "SELECT id, name, description, price, avg_rating, category_id FROM product"
product_df = pd.read_sql(query, engine)

query_reviews = "SELECT * FROM review"
review_df = pd.read_sql(query_reviews, engine)

query_users = "SELECT * FROM user"
user_df = pd.read_sql(query_users, engine)

# Create a new column with all the features
product_df['features'] = (
    product_df['name'] + ' ' +
    product_df['description'] + ' ' +
    product_df['price'].astype(str) + ' ' +
    product_df['avg_rating'].astype(str)
)

# Encode the features
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(product_df['features'])

# Compute the cosine similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Convert the cosine similarity matrix into a DataFrame
similarity_df = pd.DataFrame(cosine_sim, index=product_df['id'], columns=product_df['id'])


def get_recommendations(product_id, top_n=3):
    # Get the similarity scores of the product
    sim_scores = similarity_df[product_id].sort_values(ascending=False)
    top_indices = sim_scores.iloc[1:top_n+1].index # Exclude the product itself

    # Get the recommended products
    recommentdations = product_df[product_df['id'].isin(top_indices)]
    return recommentdations[['id', 'name', 'price', 'avg_rating']]


def user_based_recommendation(user_id, top_n=5):
    # Create a user-product matrix
    user_item_matrix = review_df.pivot(index='user_id', columns='product_id', values='rating').fillna(0)

    # Check if the user is new
    if user_id not in user_item_matrix.index:
        popular_products = review_df.groupby('product_id')['rating'].mean().sort_values(ascending=False)
        return product_df[product_df['id'].isin(popular_products.index)][:top_n]

    # Compute the cosine similarity between users
    user_similarity = cosine_similarity(user_item_matrix)

    # Get the similarity scores of the user
    user_idx = user_item_matrix.index.get_loc(user_id)

    # Get the top
    similar_users = user_similarity[user_idx].argsort()[-top_n-1:-1][::-1]

    # Get the similar users' reviews 
    similar_users_ids = user_item_matrix.index[similar_users]
    similar_users_reviews = user_item_matrix.loc[similar_users_ids]

    # Get the products that rated highly by the similar users but not rated by the target user
    user_reviews = user_item_matrix.loc[user_id]
    recommendations = similar_users_reviews.mean(axis=0).loc[user_reviews[user_reviews == 0].index].sort_values(ascending=False)

    return product_df[product_df['id'].isin(recommendations.index)][:top_n]

    