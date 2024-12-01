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
