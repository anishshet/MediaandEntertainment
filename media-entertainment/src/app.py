from flask import Flask, jsonify, send_from_directory
import pandas as pd
import os

app = Flask(__name__, static_folder="build")

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
