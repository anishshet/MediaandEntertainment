#!/usr/bin/env python
# coding: utf-8

# In[1]:


# Install necessary packages
get_ipython().system('pip install pandas matplotlib seaborn --quiet')

# Import libraries
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the dataset
# Replace the file path with the correct path in Colab if using local files
file_path = "media-entertainment/src/python/top_insta_influencers_data.csv"
data = pd.read_csv(file_path)


# In[2]:


# Function to convert shorthand notations like "3.3k", "475.8m", "29.0b" into numeric values
def convert_shorthand(value):
    if isinstance(value, str):
        if 'k' in value:
            return float(value.replace('k', '')) * 1e3
        elif 'm' in value:
            return float(value.replace('m', '')) * 1e6
        elif 'b' in value:
            return float(value.replace('b', '')) * 1e9
        elif '%' in value:
            return float(value.replace('%', '')) / 100
    return float(value)


# In[3]:


# Apply conversion to relevant columns
numeric_columns = ['posts', 'followers', 'avg_likes', '60_day_eng_rate', 
                   'new_post_avg_like', 'total_likes']
for col in numeric_columns:
    data[col] = data[col].apply(convert_shorthand)

# Compute correlation matrix for numeric columns
correlation_matrix = data.corr()


# In[4]:


# Visualize the correlation matrix
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, fmt=".2f", cmap="coolwarm", cbar=True, square=True)
plt.title("Correlation Matrix of Instagram Metrics")
plt.show()


# In[5]:


# Scatterplot: Followers vs. Average Likes
plt.figure(figsize=(8, 6))
sns.scatterplot(x=data['followers'], y=data['avg_likes'], hue=data['60_day_eng_rate'], palette='viridis')
plt.title("Followers vs. Average Likes")
plt.xlabel("Followers")
plt.ylabel("Average Likes")
plt.legend(title="Engagement Rate")
plt.show()


# In[6]:


# Bar Plot: Top Countries by Average Influence Score
top_countries = data.groupby('country')['influence_score'].mean().sort_values(ascending=False).head(10)
top_countries.plot(kind='bar', figsize=(10, 6), color='skyblue')
plt.title("Top 10 Countries by Average Influence Score")
plt.xlabel("Country")
plt.ylabel("Average Influence Score")
plt.show()


# In[7]:


# Save the cleaned dataset for future use
data.to_csv('cleaned_influencers_data.csv', index=False)


# In[9]:


#  Distribution of Followers
plt.figure(figsize=(10, 6))
sns.histplot(data['followers'], kde=True, color='blue', bins=30)
plt.title("Distribution of Followers")
plt.xlabel("Followers")
plt.ylabel("Frequency")
plt.show()


# In[15]:


# 2. Relationship: Followers vs. Engagement Rate
plt.figure(figsize=(8, 6))
sns.scatterplot(x=data['followers'], y=data['60_day_eng_rate'], hue=data['avg_likes'], palette='coolwarm')
plt.title("Followers vs. Engagement Rate")
plt.xlabel("Followers")
plt.ylabel("Engagement Rate (60 days)")
plt.legend(title="Average Likes")  # Optional: Customize the legend title
plt.show()


# In[12]:


# 3. Top Influencers by Total Likes (Bar Chart)
top_influencers = data.nlargest(10, 'total_likes')
plt.figure(figsize=(12, 6))
sns.barplot(x='channel_info', y='total_likes', data=top_influencers, palette='viridis')
plt.title("Top 10 Influencers by Total Likes")
plt.xlabel("Influencer")
plt.ylabel("Total Likes")
plt.xticks(rotation=45)
plt.show()


# In[13]:


# 4. Engagement Rate Distribution by Country
plt.figure(figsize=(14, 7))
sns.boxplot(x='country', y='60_day_eng_rate', data=data)
plt.title("Engagement Rate Distribution by Country")
plt.xlabel("Country")
plt.ylabel("Engagement Rate (60 days)")
plt.xticks(rotation=45)
plt.show()


# In[16]:


# Function to generate automated summaries for each column
def summarize_column(dataframe):
    summaries = {}
    for column in dataframe.columns:
        if pd.api.types.is_numeric_dtype(dataframe[column]):
            summaries[column] = {
                "Mean": dataframe[column].mean(),
                "Median": dataframe[column].median(),
                "Standard Deviation": dataframe[column].std(),
                "Min": dataframe[column].min(),
                "Max": dataframe[column].max(),
                "Null Count": dataframe[column].isnull().sum(),
                "Skewness": dataframe[column].skew(),
                "Kurtosis": dataframe[column].kurt(),
            }
        elif pd.api.types.is_object_dtype(dataframe[column]):
            summaries[column] = {
                "Unique Values": dataframe[column].nunique(),
                "Top Value": dataframe[column].mode()[0] if not dataframe[column].mode().empty else None,
                "Frequency of Top Value": dataframe[column].value_counts().iloc[0] if not dataframe[column].value_counts().empty else None,
                "Null Count": dataframe[column].isnull().sum(),
            }
    return summaries

# Generate summaries for the dataset
summaries = summarize_column(data)

# Display summaries in a readable format
for column, summary in summaries.items():
    print(f"--- {column} ---")
    for stat, value in summary.items():
        print(f"{stat}: {value}")
    print("\n")


# In[ ]:




