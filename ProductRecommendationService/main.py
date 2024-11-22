from sqlalchemy import create_engine
import pandas as pd

# Connect to the database
engine = create_engine('mysql+pymysql://root:sapassword@localhost:3306/ecommerce')

# Load the data from the database
query = "SELECT id, name, description, price, avg_rating, category_id FROM product"
product_df = pd.read_sql(query, engine)

# Print the data
print(product_df.head())
