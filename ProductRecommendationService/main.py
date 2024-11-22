from sqlalchemy import create_engine
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Connect to the database
engine = create_engine('mysql+pymysql://root:sapassword@localhost:3306/ecommerce')

# Load the data from the database
query = "SELECT id, name, description, price, avg_rating, category_id FROM product"
product_df = pd.read_sql(query, engine)

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


# # Example usage
# recommended_products = get_recommendations(1, similarity_df, product_df)
# print(recommended_products)


    