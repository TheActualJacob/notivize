# © 2025 Notivize (Robert Ryan). All rights reserved.
# AI Inbox Agent – MVP prototype

import re
import os.path
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build



# Define the Gmail API scope:
# 'readonly' allows us to read emails but not modify or send them
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def authenticate_gmail():
    """
    Handles Gmail API authentication using OAuth2.
    Steps:
    1. Checks if 'token.json' exists with saved credentials.
    2. If valid credentials exist, use them.
    3. If not, launch browser to log in and authorize access.
    4. Save new token.json for future use.
    Returns: an authenticated Gmail API service object.
    """
    creds = None
    # Check if a saved token exists
    if os.path.exists('src/token.json'):
        creds = Credentials.from_authorized_user_file('src/token.json', SCOPES)

    # If no valid credentials, start OAuth flow
    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(
            'src/credentials.json', SCOPES)  # Uses your local client credentials
        creds = flow.run_local_server(port=0)  # Opens browser for login
        # Save the new token for next time
        with open('src/token.json', 'w') as token:
            token.write(creds.to_json())

    # Build the Gmail API service
    service = build('gmail', 'v1', credentials=creds)
    return service

def list_messages(service, max_results=5):
    """
    Fetches a list of messages from the authenticated user's inbox.
    Args:
        service: Gmail API service object
        max_results: number of emails to fetch
    Returns:
        List of message dictionaries containing 'id' and 'threadId'
    """
    results = service.users().messages().list(
        userId='me',  # 'me' refers to the authenticated user
        maxResults=max_results
    ).execute()
    return results.get('messages', [])  # Return empty list if no messages

def get_message_snippet(service, msg_id):
    """
    Fetches a single email by message ID and returns a short snippet.
    Args:
        service: Gmail API service object
        msg_id: the unique ID of the email
    Returns:
        snippet (string) of the email content
    """
    msg = service.users().messages().get(
        userId='me',
        id=msg_id,
        format='full'  # 'full' returns all email data; snippet is a summary
    ).execute()
    return msg['snippet']


def detect_tasks_and_meetings(snippet):
    """
    Detect simple tasks, deadlines, or meetings in email snippets.
    Currently uses keyword + regex matching for MVP.
    Returns a list of detected items.
    """
    items = []

    # Detect tasks: look for common phrases
    task_keywords = ['action required', 'please review', 'follow up', 'to-do', 'task']
    for kw in task_keywords:
        if kw.lower() in snippet.lower():
            items.append({'type': 'task', 'description': snippet})

    # Detect deadlines/dates: simple regex for MM/DD/YYYY or YYYY-MM-DD
    date_matches = re.findall(r'\b(\d{1,2}/\d{1,2}/\d{2,4})\b', snippet)
    date_matches += re.findall(r'\b(\d{4}-\d{2}-\d{2})\b', snippet)
    for date in date_matches:
        items.append({'type': 'deadline', 'date': date, 'description': snippet})

    # Detect meetings: look for common meeting phrases
    meeting_keywords = ['meeting', 'call', 'zoom', 'schedule']
    for kw in meeting_keywords:
        if kw.lower() in snippet.lower():
            items.append({'type': 'meeting', 'description': snippet})

    return items

# Main execution
if __name__ == "__main__":
    print("Hello, Notivize!")
    # Authenticate and get Gmail service
    service = authenticate_gmail()

    # List the latest 5 messages
    messages = list_messages(service)
    print(f"Found {len(messages)} messages:")

    # Print a snippet of each message
    for m in messages:
        snippet = get_message_snippet(service, m['id'])
        print(f"Email snippet: {snippet}")

        detected = detect_tasks_and_meetings(snippet)
        if detected:
            print("Detected items:")
            for item in detected:
                print(f"- {item}")
        print("\n" + "-"*50 + "\n")