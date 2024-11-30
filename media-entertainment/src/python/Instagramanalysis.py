#!/usr/bin/env python
# coding: utf-8

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# File path to the dataset
import os
import pandas as pd

# Define the file path
file_path = r"media-entertainment/src/csv/Trend Data Dashboard - Instagram_Snapchat.csv"

# Try opening the file to verify its existence
try:
    with open(file_path, "r") as file:
        print("File opened successfully! Checking content...")
        # Load the file using pandas
        data = pd.read_csv(file)
        print("File loaded successfully into a DataFrame!")
except FileNotFoundError:
    print("Error: File not found. Please check the file path.")
    exit()
except Exception as e:
    print(f"An unexpected error occurred: {e}")
    exit()

# Proceed with data analysis if no errors
print(data.head())


# Inspect the dataset structure
print("\nDataset Info:")
print(data.info())

# Fix columns and handle missing data
if 'Month' in data.columns:
    data['Month'] = pd.to_datetime(data['Month'], errors='coerce')  # Convert to datetime

if 'Video length in S' in data.columns:
    data['Video length in S'] = pd.to_numeric(data['Video length in S'], errors='coerce')
    data['Video length in S'] = data['Video length in S'].fillna(data['Video length in S'].median())  # Fill missing

# Print initial descriptive statistics
print("\nSummary Statistics by Music Genre:")
if 'Music Genre' in data.columns and 'Video length in S' in data.columns:
    genre_summary = data.groupby('Music Genre')['Video length in S'].describe()
    print(genre_summary)

print("\nTop Themes by Frequency:")
if 'Theme' in data.columns:
    theme_counts = data['Theme'].value_counts()
    print(theme_counts)

# Generate correlation matrix for numeric columns
print("\nCorrelation Matrix:")
numeric_cols = data.select_dtypes(include=['float64', 'int64'])
if not numeric_cols.empty:
    correlation_matrix = numeric_cols.corr()
    print(correlation_matrix)

    # Correlation Heatmap
    plt.figure(figsize=(8, 6))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", cbar=True)
    plt.title("Correlation Heatmap")
    plt.show()

# Distribution of Video Length
if 'Video length in S' in data.columns:
    plt.figure(figsize=(8, 6))
    sns.histplot(data['Video length in S'], kde=True, bins=20, color='blue')
    plt.title("Distribution of Video Length")
    plt.xlabel("Video Length (Seconds)")
    plt.ylabel("Frequency")
    plt.show()

# Bar Plot: Trends by Music Genre
if 'Music Genre' in data.columns:
    plt.figure(figsize=(10, 6))
    data['Music Genre'].value_counts().plot(kind='bar', color='coral')
    plt.title("Number of Trends by Music Genre")
    plt.xlabel("Music Genre")
    plt.ylabel("Count")
    plt.xticks(rotation=45)
    plt.show()

# Time-Series Analysis: Average Video Length Over Time
if 'Month' in data.columns and 'Video length in S' in data.columns:
    plt.figure(figsize=(10, 6))
    time_series = data.groupby('Month')['Video length in S'].mean()
    time_series.plot(kind='line', marker='o', color='green')
    plt.title("Average Video Length Over Time")
    plt.xlabel("Month")
    plt.ylabel("Average Video Length (Seconds)")
    plt.grid(True)
    plt.show()

# Box Plot: Video Length by Music Genre
if 'Music Genre' in data.columns and 'Video length in S' in data.columns:
    plt.figure(figsize=(10, 6))
    sns.boxplot(data=data, x='Music Genre', y='Video length in S', palette='Set2')
    plt.title("Video Length by Music Genre")
    plt.xlabel("Music Genre")
    plt.ylabel("Video Length (Seconds)")
    plt.xticks(rotation=45)
    plt.show()

# Scatter Plot: Music Genre vs. Video Length with Themes
if 'Music Genre' in data.columns and 'Video length in S' in data.columns and 'Theme' in data.columns:
    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=data, x='Music Genre', y='Video length in S', hue='Theme', palette='viridis')
    plt.title("Scatterplot: Music Genre vs Video Length")
    plt.xlabel("Music Genre")
    plt.ylabel("Video Length (Seconds)")
    plt.xticks(rotation=45)
    plt.legend(title='Theme')
    plt.show()

# Summary Insights for Individual Features
def feature_summaries(df):
    summaries = {}
    for col in df.columns:
        if df[col].dtype in ['float64', 'int64']:
            summaries[col] = {
                'Mean': df[col].mean(),
                'Median': df[col].median(),
                'Standard Deviation': df[col].std(),
                'Minimum': df[col].min(),
                'Maximum': df[col].max(),
                'Missing Values': df[col].isnull().sum(),
                'Unique Values': df[col].nunique(),
            }
        elif df[col].dtype == 'object':
            summaries[col] = {
                'Most Frequent Value': df[col].mode()[0] if not df[col].mode().empty else None,
                'Missing Values': df[col].isnull().sum(),
                'Unique Values': df[col].nunique(),
                'Top 5 Categories': df[col].value_counts().head(5).to_dict(),
            }
    return pd.DataFrame(summaries).transpose()

print("\n--- Automated Column Summaries ---")
summary_table = feature_summaries(data)
print(summary_table)

# Group-level Summaries: Music Genre, Theme, and Trend Type
def group_level_summaries(df, group_by_column):
    if group_by_column not in df.columns:
        print(f"Error: Column '{group_by_column}' not found.")
        return pd.DataFrame()
    return df.groupby(group_by_column).agg(
        Mean_Video_Length=('Video length in S', 'mean'),
        Median_Video_Length=('Video length in S', 'median'),
        Std_Video_Length=('Video length in S', 'std'),
        Count=('Video length in S', 'count'),
        Missing_Values=('Video length in S', lambda x: x.isnull().sum())
    ).sort_values(by='Mean_Video_Length', ascending=False)

print("\n--- Grouped Summaries by Music Genre ---")
print(group_level_summaries(data, 'Music Genre'))

print("\n--- Grouped Summaries by Theme ---")
print(group_level_summaries(data, 'Theme'))

print("\n--- Grouped Summaries by Trend Type ---")
print(group_level_summaries(data, 'Trend Type'))

# Trends Over Time
if 'Month' in data.columns and 'Music Genre' in data.columns:
    plt.figure(figsize=(10, 6))
    genre_time_series = data.groupby(['Month', 'Music Genre'])['Video length in S'].mean().unstack()
    genre_time_series.plot(kind='line', marker='o')
    plt.title("Average Video Length by Music Genre Over Time")
    plt.xlabel("Month")
    plt.ylabel("Average Video Length (Seconds)")
    plt.legend(title="Music Genre")
    plt.grid(True)
    plt.show()
