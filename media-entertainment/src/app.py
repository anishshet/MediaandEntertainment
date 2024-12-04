from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__, static_folder="build")

# Initialize CORS
CORS(app)

# Load the data
file_path = r"F:\PROJECTS\MediaandEntertainment\media-entertainment\src\csv\instagram.csv"
data = pd.read_csv(file_path)

file_path1 = r"F:\PROJECTS\MediaandEntertainment\media-entertainment\src\csv\top_insta_influencers_data.csv"
data1 = pd.read_csv(file_path1)

# Inspecting the data
print(data.head())  # Check the first few rows
print(data.columns)  # Print all columns to verify the 'Month' column

# Ensure the 'Month' column exists
if 'Month' not in data.columns:
    print("Month column is missing. Trying to extract it from the 'Date' column.")
    if 'Date' in data.columns:
        data['Month'] = pd.to_datetime(data['Date']).dt.month
    else:
        raise ValueError("Neither 'Month' nor 'Date' column found in the dataset.")

# API route to return summary statistics
@app.route('/api/summary')
def summary():
    try:
        genre_summary = data.groupby('Music Genre')['Video length in S'].describe().to_dict()
        return jsonify(genre_summary)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# API route to return time-series data
@app.route('/api/time_series')
def time_series():
    try:
        time_series = data.groupby('Month')['Video length in S'].mean().to_dict()
        return jsonify(time_series)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Music Genre
@app.route('/api/music_genre')
def music_genre():
    try:
        music_genre = data['Music Genre'].to_dict()
        return jsonify(music_genre)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Video length
@app.route('/api/video_len')
def video_len():
    try:
        video_len = data['Video length in S'].to_dict()
        return jsonify(video_len)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Part of Song
@app.route('/api/song_part')
def part_of_song():
    try:
        part_of_song = data['Part of Song'].to_dict()
        return jsonify(part_of_song)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Theme
@app.route('/api/theme')
def theme():
    try:
        theme = data['Theme'].to_dict()
        return jsonify(theme)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Video Style
@app.route('/api/video_style')
def video_style():
    try:
        video_style = data['Video Style'].to_dict()
        return jsonify(video_style)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Music
@app.route('/api/music')
def music():
    try:
        music = data['Music'].to_dict()
        return jsonify(music)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Trend Type
@app.route('/api/trend_type')
def trend_type():
    try:
        trend_type = data['Trend Type'].to_dict()
        return jsonify(trend_type)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Trend
@app.route('/api/trend')
def trend():
    try:
        trend = data['Trend'].to_dict()
        return jsonify(trend)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Month
@app.route('/api/month')
def month():
    try:
        month = data['Month'].to_dict()
        return jsonify(month)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Data2 
# Ensure the 'Month' column exists
if 'Month' not in data1.columns:
    print("Month column is missing. Trying to extract it from the 'Date' column.")
    if 'Date' in data.columns:
        data1['Month'] = pd.to_datetime(data1['Date']).dt.month
    else:
        raise ValueError("Neither 'Month' nor 'Date' column found in the dataset.")

# API route to return summary statistics
@app.route('/api2/summary')
def summary2():
    try:
        genre_summary = data1.groupby('Music Genre')['Video length in S'].describe().to_dict()
        return jsonify(genre_summary)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# API route to return time-series data
@app.route('/api2/time_series')
def time_series2():
    try:
        time_series = data1.groupby('Month')['Video length in S'].mean().to_dict()
        return jsonify(time_series)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Music Genre
@app.route('/api2/music_genre')
def music_genre2():
    try:
        music_genre = data1['Music Genre'].to_dict()
        return jsonify(music_genre)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Video length
@app.route('/api2/video_len')
def video_len2():
    try:
        video_len = data1['Video length in S'].to_dict()
        return jsonify(video_len)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Part of Song
@app.route('/api2/song_part')
def part_of_song2():
    try:
        part_of_song = data1['Part of Song'].to_dict()
        return jsonify(part_of_song)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Theme
@app.route('/api2/theme')
def theme2():
    try:
        theme = data1['Theme'].to_dict()
        return jsonify(theme)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Video Style
@app.route('/api2/video_style')
def video_style2():
    try:
        video_style = data1['Video Style'].to_dict()
        return jsonify(video_style)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Music
@app.route('/api2/music')
def music2():
    try:
        music = data1['Music'].to_dict()
        return jsonify(music)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Trend Type
@app.route('/api2/trend_type')
def trend_type2():
    try:
        trend_type = data1['Trend Type'].to_dict()
        return jsonify(trend_type)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Trend
@app.route('/api2/trend')
def trend2():
    try:
        trend = data1['Trend'].to_dict()
        return jsonify(trend)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Month
@app.route('/api2/month')
def month2():
    try:
        month = data1['Month'].to_dict()
        return jsonify(month)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Engagement Rate (%)
@app.route('/api2/engagement')
def engagement2():
    try:
        engagement = data1['Engagement Rate (%)'].to_dict()
        return jsonify(engagement)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Audience Demographics
@app.route('/api2/audience')
def audience2():
    try:
        audience = data1['Audience Demographics'].to_dict()
        return jsonify(audience)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Route to serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")




# Handle favicon.ico
@app.route('/favicon.ico')
def favicon():
    return "", 204

if __name__ == "__main__":
    app.run(debug=True)