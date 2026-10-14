# trip-planner

A React trip planner app with route planning, map visualization, and live route support.

## Features
- trip origin and destination search
- vehicle type selection
- route estimation and trip summary
- live route support with OpenRouteService
- map rendering with Leaflet + CARTO basemap
- fallback OSRM behavior when live routing is disabled

## Getting started

```bash
npm install
npm start
```

Then (https://chembetikiranbabu.github.io/trip-planner/) in the browser.

## Environment variables

Create a `.env` file in the project root and add:

```env
REACT_APP_ORS_API_KEY=your_openrouteservice_api_key_here
REACT_APP_CARTO_API_KEY=your_carto_basemaps_api_key_here
```

This project was bootstrapped with Create React App.
