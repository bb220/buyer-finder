# Buyer Finder

AI-powered tool that identifies private equity buyers for small and medium-sized businesses.

Live demo: [https://smb-buyer-tool-226810707172.us-west1.run.app/](https://smb-buyer-tool-226810707172.us-west1.run.app/)

<img width="909" height="489" alt="image" src="https://github.com/user-attachments/assets/d2b4a388-f7f8-4a5b-9b22-e62667f929dd" />


## Overview

This app analyzes a company's website to generate an investment profile and match it with relevant private equity funds. The app uses Google's Gemini 3 Pro AI API.

## Project Structure

```
/buyer-finder/
├── App.tsx                    # Root component with state management
├── services/geminiService.ts  # AI API integration & prompt engineering
├── components/
│   ├── AnalysisView.tsx       # Results display with buyer cards
│   ├── LoadingIndicator.tsx   # Multi-step progress UI
│   └── MarkdownRenderer.tsx   # Content formatting utilities
└── types.ts                   # TypeScript type definitions
```


## How It Works

Three-phase analysis:

1. **Company Research** - Extracts industry, location, size, and offerings from the given website url
2. **Investment Suitability**  - Evaluates market stability, scalability potential, and investment risks
3. **Buyer Identification** - Identifies 5 strategic PE funds with portfolio evidence and fit rationale

## Tech Stack

- **Frontend**: React 19 + TypeScript 5.8 + Vite 6.2
- **AI Engine**: Google Gemini 3 Pro with integrated web search
- **Architecture**: Client-side web application only. No backend for this prototype.

## Getting Started

**Prerequisites**: Node.js and a Google Gemini API key

1. Install dependencies:
   ```
   npm install
   ```

2. Create `.env.local` and add your API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Deployment

This project is designed for both local development and deployment on Google AI Studio.
