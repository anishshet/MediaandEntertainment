#!/usr/bin/env python
# coding: utf-8

# In[1]:


pip install requests beautifulsoup4 pandas matplotlib seaborn


# In[7]:


import requests
from bs4 import BeautifulSoup
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import re  # Regular expression for extracting numbers

# Function to parse tweet volume and handle non-numeric values
def parse_tweet_volume(volume_text):
    try:
        # Use regex to extract only the numeric part and check for 'K' or 'M' for scaling
        numeric_text = re.sub(r'[^0-9KkMm]', '', volume_text)  # Keep only numbers, K, and M
        if 'K' in numeric_text or 'k' in numeric_text:
            return int(numeric_text.replace('K', '').replace('k', '') + '00')  # Convert 'K' to thousands (1000)
        elif 'M' in numeric_text or 'm' in numeric_text:
            return int(numeric_text.replace('M', '').replace('m', '') + '000000')  # Convert 'M' to millions (1000000)
        else:
            return int(numeric_text)  # Return as integer if no 'K' or 'M'
    except ValueError:
        # Return None if conversion fails
        return None

# URL of the website
url = "https://trends24.in/india/"

# Fetch the webpage content
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract trends and metadata
trends = []
current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Timestamp for captured trends
for trend_block in soup.find_all('ol', class_='trend-card__list'):
    for trend in trend_block.find_all('li'):
        name = trend.text.strip()  # Trend name
        volume = trend.find('span')  # Extract tweet volume if available
        
        # Use the volume parsing function
        tweet_volume = parse_tweet_volume(volume.text) if volume else None
        trends.append({
            'Trend Name': name,
            'Tweet Volume': tweet_volume,
            'Timestamp': current_time
        })

# Create a DataFrame
data = pd.DataFrame(trends)

# Add rank column based on order
data['Rank'] = data.index + 1

# Preview the dataset
print("\n--- Preview of the Scraped Data ---\n")
print(data.head(10))

# Cleaning: Handle missing values in 'Tweet Volume'
data['Tweet Volume'] = data['Tweet Volume'].fillna(0)

# Summary Table
summary = data.describe(include='all')
print("\n--- Summary Table ---\n")
print(summary)

# Correlation Analysis
correlation_matrix = data.corr()
print("\n--- Correlation Matrix ---\n")
print(correlation_matrix)


# In[8]:


# Cleaning: Handle missing values in 'Tweet Volume'
data['Tweet Volume'] = data['Tweet Volume'].fillna(0)

# Summary Table
summary = data.describe(include='all')
print("\n--- Summary Table ---\n")
print(summary)

# Correlation Analysis
correlation_matrix = data.corr()
print("\n--- Correlation Matrix ---\n")
print(correlation_matrix)


# In[9]:


# Visualizations
plt.figure(figsize=(8, 6))
sns.barplot(data=data, x='Rank', y='Tweet Volume', palette='viridis')
plt.title('Tweet Volume by Rank')
plt.xlabel('Rank')
plt.ylabel('Tweet Volume')
plt.show()


# In[10]:


# Distribution of Tweet Volume
plt.figure(figsize=(8, 6))
sns.histplot(data['Tweet Volume'], bins=20, kde=True, color='blue')
plt.title('Distribution of Tweet Volume')
plt.xlabel('Tweet Volume')
plt.ylabel('Frequency')
plt.grid(True)
plt.show()


# In[11]:


# Scatter plot: Rank vs Tweet Volume
plt.figure(figsize=(8, 6))
sns.scatterplot(data=data, x='Rank', y='Tweet Volume', hue='Tweet Volume', size='Tweet Volume', sizes=(20, 200), palette='cool')
plt.title('Tweet Volume vs Rank')
plt.xlabel('Rank')
plt.ylabel('Tweet Volume')
plt.grid(True)
plt.show()


# In[ ]:


get_ipython().system('pip install requests beautifulsoup4 pandas openpyxl')


# In[ ]:


import requests
from bs4 import BeautifulSoup
import pandas as pd

# URL of the website to scrape
url = 'https://trends24.in/india/'

# Send HTTP request to the URL
response = requests.get(url)
response.raise_for_status()  # Check if the request was successful

# Parse the page content using BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Find the trends section in the HTML (based on inspection of the page's structure)
trends = soup.find_all('div', class_='trend-card')

# Initialize lists to store trend data
trend_names = []
tweet_volumes = []

# Loop through each trend and extract the relevant data
for trend in trends:
    name = trend.find('a', class_='trend-card-title').text.strip()
    volume = trend.find('span', class_='trend-card-stats-volume').text.strip()
    
    # Clean up tweet volume (e.g., remove unwanted characters, convert to numbers)
    volume = volume.replace('K', '000').replace('M', '000000').replace(',', '')
    
    trend_names.append(name)
    tweet_volumes.append(volume)

# Create a DataFrame using the extracted data
data = pd.DataFrame({
    'Trend Name': trend_names,
    'Tweet Volume': tweet_volumes
})

# Convert 'Tweet Volume' to numeric values for easier analysis
data['Tweet Volume'] = pd.to_numeric(data['Tweet Volume'], errors='coerce')

# Save the DataFrame to an Excel file
data.to_excel('twitter_trends_india.xlsx', index=False)

print("Data has been scraped and saved to 'twitter_trends_india.xlsx'.")


# In[ ]:


import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Ensure matplotlib inline (only for Jupyter/Colab)
get_ipython().run_line_magic('matplotlib', 'inline')

# Load your dataset (replace 'your_dataset.csv' with the actual path)
data = pd.read_csv('your_dataset.csv')

# Check if 'Tweet Volume' and 'Timestamp' columns exist and are valid
print(data[['Tweet Volume', 'Timestamp']].head())

# Ensure 'Tweet Volume' is numeric and 'Timestamp' is datetime
data['Tweet Volume'] = pd.to_numeric(data['Tweet Volume'], errors='coerce')
data['Timestamp'] = pd.to_datetime(data['Timestamp'], errors='coerce')

# 1. Time Series Plot for Tweet Volume Over Time
plt.figure(figsize=(12, 6))
time_series_data = data.groupby('Timestamp')['Tweet Volume'].mean()
time_series_data.plot(kind='line', marker='o', color='blue')
plt.title('Average Tweet Volume Over Time')
plt.xlabel('Timestamp')
plt.ylabel('Average Tweet Volume')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()  # Explicit call to show the plot

# 2. Box Plot to Show Distribution and Outliers
plt.figure(figsize=(10, 6))
sns.boxplot(x=data['Tweet Volume'], color='purple')
plt.title('Box Plot of Tweet Volume')
plt.xlabel('Tweet Volume')
plt.grid(True)
plt.tight_layout()
plt.show()  # Explicit call to show the plot

# 3. Heatmap of Correlation Matrix
plt.figure(figsize=(10, 8))
correlation_matrix = data.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt='.2f', cbar=True)
plt.title('Correlation Matrix Heatmap')
plt.tight_layout()
plt.show()  # Explicit call to show the plot

# 4. Pairplot for Visualizing Relationships Between Numerical Features
sns.pairplot(data, vars=['Rank', 'Tweet Volume'], kind='scatter', plot_kws={'alpha': 0.5})
plt.suptitle('Pairplot for Rank vs Tweet Volume', y=1.02)
plt.show()  # Explicit call to show the plot

# 5. Bar Plot of Top Trending Topics by Tweet Volume
top_trends = data.sort_values(by='Tweet Volume', ascending=False).head(10)
plt.figure(figsize=(10, 6))
sns.barplot(x='Tweet Volume', y='Trend Name', data=top_trends, palette='viridis')
plt.title('Top 10 Trending Topics by Tweet Volume')
plt.xlabel('Tweet Volume')
plt.ylabel('Trend Name')
plt.tight_layout()
plt.show()  # Explicit call to show the plot

# 6. Histogram for Rank Distribution
plt.figure(figsize=(10, 6))
sns.histplot(data['Rank'], bins=30, kde=True, color='orange')
plt.title('Rank Distribution of Trends')
plt.xlabel('Rank')
plt.ylabel('Frequency')
plt.grid(True)
plt.tight_layout()
plt.show()  # Explicit call to show the plot

# 7. Violin Plot for Distribution of Tweet Volume
plt.figure(figsize=(10, 6))
sns.violinplot(x=data['Tweet Volume'], color='green')
plt.title('Violin Plot of Tweet Volume')
plt.xlabel('Tweet Volume')
plt.grid(True)
plt.tight_layout()
plt.show()  # Explicit call to show the plot

# 8. Word Cloud for Trending Topics (if necessary)
from wordcloud import WordCloud

# Combine all trend names into a single string
trend_names = ' '.join(data['Trend Name'].dropna())

# Generate a word cloud
wordcloud = WordCloud(width=800, height=400, background_color='white').generate(trend_names)

# Plot the word cloud
plt.figure(figsize=(10, 6))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis('off')
plt.title('Word Cloud for Trending Topics')
plt.show()  # Explicit call to show the plot


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




