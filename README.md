# Erosion Predictor

A web-based Soil Erosion Predictor built with Next.js, the Gemini API model, and the Google Maps JavaScript API. This app helps estimate erosion risk for a selected area and provides visualization and mitigation suggestions

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [How it works](#how-it-works)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment variables](#environment-variables)
  - [Running locally](#running-locally)
  - [Building for production](#building-for-production)
- [Usage](#usage)
- [Configuration and tuning](#configuration-and-tuning)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Demo

(Include screenshots or a short demo GIF here. Replace this section with a link to a live deployment if available.)

## Features

- Interactive map interface (Google Maps) for selecting areas of interest
- Draw polygons/lines/markers to specify the area to evaluate
- Model-driven erosion risk predictions using the Gemini API
- Visual heatmap and layer overlays to show predicted erosion risk
- Exportable results (CSV/GeoJSON) and mitigation suggestions
- Simple, extensible Next.js codebase for adding new inputs or models

## How it works

1. The user selects or draws an area on the map and provides optional parameters (soil type, land cover, recent rainfall, slope estimates, etc.).
2. The frontend sends the area geometry and parameters to a backend API route.
3. The backend formats a prompt and calls the Gemini API model to run the prediction or scoring routine.
4. The model response is parsed and returned to the frontend.
5. The frontend renders the prediction results as a heatmap / polygon styling and presents recommendations.

Note: The exact prediction logic and prompts are in the repository and can be adjusted to improve accuracy or to use different model versions.

## Technology stack

- Next.js — React framework for the frontend and server-side API routes
- Gemini API — large multimodal/text model used for prediction and analysis
- Google Maps JavaScript API — map display, drawing tools, tile layers
- Node.js — runtime for server-side API routes
- (Optional) Turf.js or similar — spatial operations on GeoJSON

## Getting started

### Prerequisites

- Node.js 18+ and npm (or yarn)
- Google Cloud account with Maps JavaScript API enabled
- Access to the Gemini model via Google's AI / PaLM API (API key or service account credentials)

### Installation

1. Clone the repo:

   git clone https://github.com/Joshk21758/erosion-predictor.git
   cd erosion-predictor

2. Install dependencies:

   npm install
   # or
   yarn install

### Environment variables

Create a `.env.local` in the project root and add the keys below. Example:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GEMINI_API_KEY=your_gemini_api_key
# Optional: name or id of the model to use, if your integration supports it
GEMINI_MODEL=gemini-model-name

# Optional runtime settings
NEXT_PUBLIC_MAP_DEFAULT_LAT=37.7749
NEXT_PUBLIC_MAP_DEFAULT_LNG=-122.4194
NEXT_PUBLIC_MAP_DEFAULT_ZOOM=10
```

How to obtain keys:
- Google Maps API key: enable Maps JavaScript API in Google Cloud Console, create an API key and restrict it to your domain.
- Gemini API key: follow Google Cloud AI / PaLM or the provider documentation for access to Gemini (this may require enabling billing, APIs, or using a service account/token).

### Running locally

Start the development server:

   npm run dev
   # or
   yarn dev

Open http://localhost:3000 in your browser.

### Building for production

   npm run build
   npm run start

Or deploy to platforms that support Next.js (Vercel, Netlify with adapter, or your preferred host).

## Usage

- Open the app in the browser and allow map loading.
- Use the drawing tools to mark the plot or area you want evaluated.
- Provide any additional inputs (soil type, cover, recent rainfall) in the sidebar or form.
- Submit the request — the app will contact the backend which calls the Gemini API and returns predictions.
- View results overlaid on the map and download any reports or GeoJSON if needed.

## Configuration and tuning

- Prompts and model configuration: see `lib/prediction` or the API route handling model calls (adjust prompt, temperature, model name).
- Map display: change default tile layers, styles, or overlay thresholds in the map component.
- Input features: add/remove features passed to the model (slope, texture, land cover classes) and update the prompt template.

## Testing

- Add unit tests for any pure utility functions (prompt building, GeoJSON transforms).
- Use integration tests (Playwright / Cypress) for map interactions and end-to-end flows if desired.

## Troubleshooting

- Maps not loading: check the browser console for Maps API errors and verify the API key is enabled and properly restricted.
- Model request failing: verify GEMINI_API_KEY and model configuration. Check rate limits and billing settings.
- CORS or server errors: ensure your API routes are reachable and the environment variables are set in your deployment environment.

## Contributing

Contributions are welcome. Please:

1. Open an issue to discuss larger changes.
2. Create a feature branch and open a pull request with a clear description and tests where appropriate.

## Security

- Do not commit API keys or service account JSON to the repository. Use environment variables or secret stores.
- Restrict your Google Maps API key to authorized referrers (your domain or local dev host) in the Cloud Console.

## License

This project is provided under the MIT License — see LICENSE for details.

## Acknowledgements

- Built using Next.js
- Google Maps Platform
- Gemini model (Google)

