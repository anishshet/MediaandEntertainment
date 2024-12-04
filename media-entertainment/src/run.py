from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
import googleapiclient.http

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024 * 1024  # Max file size: 5GB

# Enable CORS for frontend communication
CORS(app, resources={r"/*": {"origins": "http://localhost:5100"}})  # Ensure CORS is correctly set for localhost frontend

# SCOPES and CLIENT_SECRETS_FILE (change to your deployed path)
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
CLIENT_SECRETS_FILE = r"F:\PROJECTS\MediaandEntertainment\media-entertainment\src\client.json"  # Update this path

def authenticate_youtube():
    """
    Authenticate and return a YouTube client using OAuth 2.0.
    """
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # For non-HTTPS servers
    try:
        # Create the OAuth flow object using the client secrets file
        flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
            CLIENT_SECRETS_FILE, SCOPES
        )

        # Set the redirect URI (ensure it matches the URI in the Google Cloud Console)
        flow.redirect_uri = 'http://localhost:5100/oauth2callback'

        # Run the local server to handle the OAuth 2.0 callback
        credentials = flow.run_local_server(port=5100)

        # Build the YouTube API client with the authenticated credentials
        youtube = googleapiclient.discovery.build("youtube", "v3", credentials=credentials)
        return youtube
    except Exception as e:
        raise Exception(f"Authentication failed: {str(e)}")

@app.route('/upload', methods=['POST'])
def upload_video():
    """
    Handle video upload to YouTube.
    """
    try:
        # Get file and metadata from the request
        file = request.files.get('file')
        title = request.form.get('title', 'Uploaded from Python')
        description = request.form.get('description', 'Default description')
        tags = request.form.getlist('tags') or ["test", "python", "api"]

        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        # Save the uploaded file temporarily
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        file_path = os.path.join(temp_dir, file.filename)
        file.save(file_path)

        # Authenticate YouTube API
        youtube = authenticate_youtube()

        # Prepare the request body
        request_body = {
            "snippet": {
                "categoryId": "22",  # Default category: People & Blogs
                "title": title,
                "description": description,
                "tags": tags
            },
            "status": {
                "privacyStatus": "private"  # Default privacy status
            }
        }

        # Prepare the media file upload
        media_file = googleapiclient.http.MediaFileUpload(file_path, chunksize=-1, resumable=True)

        # Start the video upload
        youtube_request = youtube.videos().insert(  # Rename to avoid conflict
            part="snippet,status",
            body=request_body,
            media_body=media_file
        )

        response = None
        while response is None:
            status, response = youtube_request.next_chunk()
            if status:
                print(f"Upload progress: {int(status.progress() * 100)}%")

        # Clean up temporary file after successful upload
        if os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({'message': 'Upload successful', 'video_id': response.get('id')})

    except googleapiclient.errors.HttpError as e:
        # Handle YouTube API errors
        error_content = e.content.decode('utf-8') if hasattr(e.content, 'decode') else str(e.content)
        return jsonify({'error': f"YouTube API error: {error_content}"}), 500

    except Exception as e:
        # Handle general exceptions
        return jsonify({'error': f"Unexpected error: {str(e)}"}), 500

    finally:
        # Ensure temporary directory is cleaned
        if os.path.exists("temp"):
            for temp_file in os.listdir("temp"):
                try:
                    os.remove(os.path.join("temp", temp_file))
                except Exception:
                    pass

@app.route('/oauth2callback')
def oauth2callback():
    """
    Handle the OAuth 2.0 callback and store the credentials.
    """
    try:
        # Get the authorization response
        authorization_response = request.url

        # Initialize the OAuth flow
        flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
            CLIENT_SECRETS_FILE, SCOPES
        )
        flow.redirect_uri = 'http://localhost:5100/oauth2callback'

        # Fetch the OAuth 2.0 credentials using the authorization response
        credentials = flow.fetch_token(authorization_response=authorization_response)

        # Save the credentials (you can save them in a file or database as needed)
        return jsonify({'message': 'OAuth2 callback successful, credentials saved!'})
    except Exception as e:
        return jsonify({'error': f"OAuth callback failed: {str(e)}"}), 500

if __name__ == '__main__':
    # Make the app accessible externally in cloud environments
    app.run(host='0.0.0.0', port=5100, debug=True)
