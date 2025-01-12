# Project Overview

This project is designed to handle webhooks and generate transcripts from YouTube videos, as well as summarize the content of these videos. The following tools and technologies were used:

## Tools and Technologies

- **n8n**: Used as a webhook handler to receive and process incoming webhooks.
- **Gemini**: Utilized to summarize the content of YouTube videos.

## Features

1. **Webhook Handling**: 
   - Implemented using n8n to receive webhooks from various sources.
   - Processes the incoming data and triggers the appropriate workflows.

2. **Transcript Generation**:
   - Extracts audio from YouTube videos.
   - Converts the audio to text to generate transcripts.

3. **Video Summarization**:
   - Uses Gemini to analyze and summarize the content of YouTube videos.
   - Provides concise summaries for quick understanding of video content.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure n8n:
   - Set up n8n to handle incoming webhooks.
   - Define workflows to process the data and trigger transcript generation and summarization.

4. Run the project:
   ```bash
   npm run dev
   ```

## Usage

- Send a webhook to the configured n8n endpoint.
- The webhook data will be processed, and the YouTube video transcript will be generated.
- The transcript will be summarized using Gemini, and the summary will be returned.

## Contributing

Feel free to submit issues or pull requests if you have any improvements or suggestions.

## License

This project is licensed under the MIT License.
