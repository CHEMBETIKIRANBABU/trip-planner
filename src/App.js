import React, { useState, useEffect, useRef } from 'react';

// --- ICONS (Inline SVGs) ---
const Icons = {
  Map: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  Settings: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Navigation: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  ),
  Car: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  Plane: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12h20" />
      <path d="M13 5l7 7-7 7" />
      <path d="M10 5l7 7-7 7" transform="scale(-1, 1) translate(-24, 0) rotate(45 12 12)" />
      <path d="M2 12l5-5m10 10l5-5" stroke="none" />
      <path d="M20.667 3.333a2.667 2.667 0 0 0-3.774 0l-9.56 9.56-.946 5.68 3.787 1.893 2.84-2.84 4.734.947 2.92-5.467a2.667 2.667 0 0 0 0-3.773z" />
      <path d="M8.227 12.893 2 15l2 2 2.107-6.227" />
    </svg>
  ),
  AlertCircle: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Loader2: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  Traffic: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6.5 17h11" />
      <path d="M6 20h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z" />
      <path d="M6 14h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
      <path d="M11.5 6V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Info: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  ChevronRight: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  Clock: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  FuelPump: ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 22v-8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8" />
      <path d="M15 9h5" />
      <path d="M18 9v6a3 3 0 0 1-3 3" />
      <path d="M5 6v2" />
      <path d="M9 6v2" />
      <path d="M3 6v2" />
    </svg>
  ),
  Ticket: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
};

// --- DATA: REGIONAL CONFIGURATION ---
const REGION_CONFIG = {
  'in': { currency: '₹', unit: 'metric', fuelPrice: 102.5, tollRate: 1.8, name: 'India' },
  'us': { currency: '$', unit: 'imperial', fuelPrice: 3.50, tollRate: 0.06, name: 'United States' },
  'gb': { currency: '£', unit: 'metric', fuelPrice: 1.50, tollRate: 0.10, name: 'United Kingdom' },
  'de': { currency: '€', unit: 'metric', fuelPrice: 1.80, tollRate: 0.08, name: 'Europe (DE)' },
  'default': { currency: '$', unit: 'metric', fuelPrice: 1.10, tollRate: 0.05, name: 'International' }
};

// --- DATA: VEHICLE SPECS ---
const VEHICLE_SPECS = {
  sedan: { label: 'Sedan / Hatchback', effMetric: 14, effImperial: 33 },
  suv: { label: 'SUV / Crossover', effMetric: 9, effImperial: 21 },
  bike: { label: 'Motorcycle', effMetric: 40, effImperial: 94 },
  truck: { label: 'Truck / Van', effMetric: 6, effImperial: 14 },
  ev: { label: 'Electric Vehicle', effMetric: 6, effImperial: 3.5 },
  plane: { label: 'Flight / Airplane', effMetric: 0, effImperial: 0 } // efficiency calculated differently
};

export default function App() {
  // State: Inputs
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState('sedan');
  
  // State: Computed/Detected
  const [detectedRegion, setDetectedRegion] = useState(null);
  
  // State: API Settings
  const [useRealTime, setUseRealTime] = useState(false);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_ORS_API_KEY || '');
  const cartoApiKey = process.env.REACT_APP_CARTO_API_KEY || '';
  const [manualRegion, setManualRegion] = useState(''); // '' means Auto-detect
  const [showSettings, setShowSettings] = useState(false);

  // State: App Logic
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); 
  const [mapZoom, setMapZoom] = useState(5);
  
  // Refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);
  const markersRef = useRef([]);
  const resultsRef = useRef(null); 
  const isFirstRender = useRef(true);

  // State: Suggestions
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showOriginSug, setShowOriginSug] = useState(false);
  const [showDestSug, setShowDestSug] = useState(false);

  // Constants
  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";
  const OSRM_BASE_URL = "https://router.project-osrm.org/route/v1/driving";
  const ORS_BASE_URL = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

  // --- MAP INITIALIZATION ---
  useEffect(() => {
    if (window.L && window.L.map) {
      initMap();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => setTimeout(initMap, 100);
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initMap = () => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;
    try {
      const map = window.L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true
      }).setView(mapCenter, mapZoom);
      
      const cartoTileUrl = cartoApiKey
        ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?api_key=${cartoApiKey}`
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      window.L.tileLayer(cartoTileUrl, {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Fix default icons
      const defaultIcon = window.L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      window.L.Marker.prototype.options.icon = defaultIcon;
      mapInstanceRef.current = map;
    } catch (err) {
      console.error("Map init error:", err);
    }
  };

  // --- MAP UPDATES ---
  useEffect(() => {
    if (!mapInstanceRef.current || !routeData || !window.L) return;
    const map = mapInstanceRef.current;
    const L = window.L;

    // Need to invalidate size when layout changes to top/bottom split
    map.invalidateSize();

    if (routeLayerRef.current) map.removeLayer(routeLayerRef.current);
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    routeLayerRef.current = L.polyline(routeData.geometry, {
      color: routeData.vehicleType === 'plane' ? '#8b5cf6' : (routeData.isRealTime ? '#ef4444' : '#3b82f6'),
      weight: routeData.vehicleType === 'plane' ? 4 : (routeData.isRealTime ? 8 : 7),
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: routeData.vehicleType === 'plane' ? '10, 10' : null,
      className: 'route-line'
    }).addTo(map);

    const startMarker = L.marker([routeData.startCoords.lat, routeData.startCoords.lon])
      .bindPopup(`<b>Start:</b> ${origin}`).addTo(map);
    const endMarker = L.marker([routeData.endCoords.lat, routeData.endCoords.lon])
      .bindPopup(`<b>Destination:</b> ${destination}`).addTo(map);
    markersRef.current.push(startMarker, endMarker);

    map.fitBounds(routeData.bounds, { padding: [50, 50] });
  }, [routeData]);


  // --- AUTOCOMPLETE ---
  const handleInput = (val, setVal, setShow) => { setVal(val); setShow(true); };
  const handleSelect = (item, setVal, setList, setShow) => { setVal(item.display_name); setList([]); setShow(false); };
  
  useEffect(() => {
    const t = setTimeout(() => { if (showOriginSug && origin.length > 2) fetchSuggestions(origin, setOriginSuggestions); }, 500);
    return () => clearTimeout(t);
  }, [origin, showOriginSug]);

  useEffect(() => {
    const t = setTimeout(() => { if (showDestSug && destination.length > 2) fetchSuggestions(destination, setDestSuggestions); }, 500);
    return () => clearTimeout(t);
  }, [destination, showDestSug]);

  const fetchSuggestions = async (q, setFunc) => {
    try {
      const res = await fetch(`${NOMINATIM_BASE_URL}?format=json&q=${encodeURIComponent(q)}&addressdetails=1`);
      const data = await res.json();
      setFunc(data);
    } catch(e) {}
  };

  // --- MATH HELPERS FOR FLIGHTS ---
  const getCrowFliesDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; 
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in meters
  }

  const getCurvedGeometry = (start, end) => {
    const lat1 = start.lat;
    const lon1 = start.lon;
    const lat2 = end.lat;
    const lon2 = end.lon;
    const points = [];
    for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        let lat = lat1 + (lat2 - lat1) * t;
        let lon = lon1 + (lon2 - lon1) * t;
        const dist = Math.sqrt(Math.pow(lat2-lat1, 2) + Math.pow(lon2-lon1, 2));
        if (dist > 5) {
            lat += Math.sin(t * Math.PI) * (dist * 0.2); 
        }
        points.push([lat, lon]);
    }
    return points;
  };

  // --- CORE CALCULATION LOGIC ---
  const performCalculation = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!origin || !destination) throw new Error("Please enter start and end locations.");

      const startRes = await fetch(`${NOMINATIM_BASE_URL}?format=json&limit=1&q=${encodeURIComponent(origin)}&addressdetails=1`);
      const startData = await startRes.json();
      if (!startData.length) throw new Error("Start location not found.");

      const endRes = await fetch(`${NOMINATIM_BASE_URL}?format=json&limit=1&q=${encodeURIComponent(destination)}`);
      const endData = await endRes.json();
      if (!endData.length) throw new Error("Destination location not found.");

      const startCoords = { lat: parseFloat(startData[0].lat), lon: parseFloat(startData[0].lon) };
      const endCoords = { lat: parseFloat(endData[0].lat), lon: parseFloat(endData[0].lon) };
      
      const countryCode = startData[0].address?.country_code || 'default';
      
      // LOGIC: Use manual region if set, otherwise use auto-detected country
      let regionKey = manualRegion || countryCode;
      let region = REGION_CONFIG[regionKey] || REGION_CONFIG['default'];
      
      // Keep supported regions for flights, else default to Intl ($) - unless manually overridden
      if (!manualRegion && vehicleType === 'plane' && !['in', 'gb', 'de', 'us'].includes(countryCode)) {
         region = REGION_CONFIG['default'];
      }
      setDetectedRegion(region);

      if (vehicleType === 'plane') {
          calculateFlightTrip(startCoords, endCoords, region);
      } else {
          if (useRealTime && apiKey) {
            await calculateORSRoute(startCoords, endCoords, region);
          } else {
            await calculateOSRMTrip(startCoords, endCoords, region);
          }
      }
    } catch (err) {
      setError(err.message || "Calculation failed.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTrip = (e) => {
    if (e) e.preventDefault();
    performCalculation();
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (origin && destination && routeData) {
      performCalculation();
    }
  }, [vehicleType, manualRegion]); // Recalculate if region changes

  const calculateFlightTrip = (start, end, region) => {
      const distMeters = getCrowFliesDistance(start.lat, start.lon, end.lat, end.lon);
      const geometry = getCurvedGeometry(start, end);
      const durSeconds = distMeters / 250; 
      processTripData(distMeters, durSeconds, 0, geometry, start, end, false, region);
  };

  const calculateOSRMTrip = async (start, end, region) => {
    try {
      const res = await fetch(`${OSRM_BASE_URL}/${start.lon},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson`);
      const json = await res.json();
      if (!json.routes?.length) throw new Error("No driving route found. Try 'Plane' mode.");
      const route = json.routes[0];
      const geometry = route.geometry.coordinates.map(c => [c[1], c[0]]);
      processTripData(route.distance, route.duration, 0, geometry, start, end, false, region);
    } catch (e) {
      throw new Error("Driving route failed. Locations might be separated by ocean. Switch vehicle to 'Plane'.");
    }
  };

  const calculateORSRoute = async (start, end, region) => {
    const res = await fetch(ORS_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify({
        coordinates: [[start.lon, start.lat], [end.lon, end.lat]],
        preference: 'fastest',
        units: 'km',
        geometry_simplify: false,
        format: 'geojson'
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error?.message || 'OpenRouteService route failed.');
    }

    const feature = json.features?.[0];
    if (!feature) throw new Error("No route found (OpenRouteService). Switch to 'Plane'?");

    const geometry = feature.geometry.coordinates.map(c => [c[1], c[0]]);
    const summary = feature.properties?.summary || {};
    processTripData(
      summary.distance || 0,
      summary.duration || 0,
      0,
      geometry,
      start,
      end,
      true,
      region
    );
  };

  const processTripData = (distMeters, durSeconds, trafficDelay, geometry, start, end, isRealTime, region) => {
    const isImperial = region.unit === 'imperial';
    let distVal, fuelNeeded, fuelCostVal, tollEst;

    if (isImperial) {
      distVal = distMeters * 0.000621371; 
    } else {
      distVal = distMeters / 1000; 
    }

    if (vehicleType === 'plane') {
        const ratePerUnit = isImperial ? 0.18 : 0.11; 
        
        let multiplier = 1;
        if (region.currency === '₹') multiplier = 83; 
        if (region.currency === '€') multiplier = 0.92;
        if (region.currency === '£') multiplier = 0.79;
        
        const baseCost = distVal * ratePerUnit * multiplier;
        fuelCostVal = baseCost + (50 * multiplier); 
        tollEst = 0; 
    } else {
        const eff = isImperial ? VEHICLE_SPECS[vehicleType].effImperial : VEHICLE_SPECS[vehicleType].effMetric;
        if (vehicleType === 'ev') {
          fuelNeeded = distVal / eff;
          fuelCostVal = fuelNeeded * (region.fuelPrice * 0.15); 
        } else {
          fuelNeeded = distVal / eff;
          fuelCostVal = fuelNeeded * region.fuelPrice;
        }
        tollEst = distVal * region.tollRate;
    }

    setRouteData({
      geometry,
      bounds: [[start.lat, start.lon], [end.lat, end.lon]],
      startCoords: start,
      endCoords: end,
      isRealTime,
      region,
      vehicleType,
      stats: {
        distance: distVal,
        duration: durSeconds,
        trafficDelay: trafficDelay,
        fuelCost: fuelCostVal || 0,
        tollCost: tollEst || 0,
        totalCost: (fuelCostVal || 0) + (tollEst || 0),
        fuelPriceUsed: region.fuelPrice
      }
    });
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* --- TOP SECTION: ESTIMATION & CONTROLS --- */}
      <div className="w-full bg-white z-20 shadow-xl border-b border-gray-200 overflow-y-auto flex-shrink-0" style={{ maxHeight: '60vh' }}>
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* LEFT COLUMN: FORM */}
            <div className="w-full md:w-1/2 lg:w-5/12 space-y-6">
                
               {/* Header */}
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
                      <Icons.Map className="text-white w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                      Trip Planner
                    </h1>
                  </div>
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-500'}`}
                    title="API Settings"
                  >
                    <Icons.Settings className="w-5 h-5" />
                  </button>
               </div>

               {/* Settings Expandable */}
               {showSettings && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm animate-in slide-in-from-top-2 fade-in">
                    
                    {/* Region Selector */}
                    <div className="mb-4">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Region / Currency</label>
                      <select 
                        value={manualRegion}
                        onChange={(e) => setManualRegion(e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">📍 Auto-detect from Location</option>
                        {Object.entries(REGION_CONFIG).filter(([k]) => k !== 'default').map(([key, data]) => (
                          <option key={key} value={key}>{data.name} ({data.currency})</option>
                        ))}
                        <option value="default">International ($)</option>
                      </select>
                    </div>

                    <div className="h-px bg-gray-200 my-3" />

                    <div className="flex items-center gap-2 mb-2">
                      <input 
                        type="checkbox" 
                        id="rt-toggle"
                        checked={useRealTime} 
                        onChange={(e) => setUseRealTime(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="rt-toggle" className="font-medium">Enable Live Traffic (OpenRouteService)</label>
                    </div>
                    {useRealTime && (
                      <input 
                        type="password" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter OpenRouteService API Key"
                        className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    )}
                  </div>
               )}

               <form onSubmit={calculateTrip} className="space-y-5">
                  <div className="relative space-y-4">
                    {/* Connector Line */}
                    <div className="absolute left-[1.15rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-400 to-red-400/50 rounded-full pointer-events-none" />

                    {/* Start Input */}
                    <div className="group relative">
                      <div className="absolute left-3 top-3.5 z-10 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
                      <input
                        type="text" 
                        value={origin}
                        onChange={(e) => handleInput(e.target.value, setOrigin, setShowOriginSug)}
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 border-0 ring-1 ring-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm group-hover:ring-gray-300"
                        placeholder="Where from?"
                      />
                      {showOriginSug && originSuggestions.length > 0 && (
                        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto divide-y divide-gray-50">
                          {originSuggestions.map((s, i) => (
                            <li key={i} onClick={() => handleSelect(s, setOrigin, setOriginSuggestions, setShowOriginSug)} className="p-3 hover:bg-blue-50 cursor-pointer text-sm truncate text-gray-600">
                              {s.display_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* End Input */}
                    <div className="group relative">
                      <div className="absolute left-3 top-3.5 z-10 w-2.5 h-2.5 bg-red-500 rounded-sm border-2 border-white shadow-sm" />
                      <input
                        type="text" 
                        value={destination}
                        onChange={(e) => handleInput(e.target.value, setDestination, setShowDestSug)}
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 border-0 ring-1 ring-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm group-hover:ring-gray-300"
                        placeholder="Where to?"
                      />
                      {showDestSug && destSuggestions.length > 0 && (
                        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto divide-y divide-gray-50">
                          {destSuggestions.map((s, i) => (
                            <li key={i} onClick={() => handleSelect(s, setDestination, setDestSuggestions, setShowDestSug)} className="p-3 hover:bg-blue-50 cursor-pointer text-sm truncate text-gray-600">
                              {s.display_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Vehicle Selector */}
                  <div className="relative">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Vehicle Mode</label>
                    <div className="relative">
                      {vehicleType === 'plane' ? 
                        <Icons.Plane className="absolute left-3 top-3 w-5 h-5 text-purple-500" /> : 
                        <Icons.Car className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      }
                      <select 
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border-0 ring-1 ring-gray-200 rounded-xl text-sm font-medium appearance-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                      >
                        {Object.entries(VEHICLE_SPECS).map(([key, data]) => (
                          <option key={key} value={key}>{data.label}</option>
                        ))}
                      </select>
                      <Icons.ChevronRight className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full group relative overflow-hidden text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${vehicleType === 'plane' ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/30' : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30'}`}
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? <Icons.Loader2 className="animate-spin w-5 h-5" /> : (
                        <>Calculate Cost <Icons.ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                      )}
                    </span>
                  </button>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium flex gap-2 items-start animate-in fade-in slide-in-from-top-1">
                      <Icons.AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      {error}
                    </div>
                  )}
               </form>
            </div>

            {/* RIGHT COLUMN: RESULTS */}
            <div className="w-full md:w-1/2 lg:w-7/12">
               {routeData && !loading ? (
                 <div ref={resultsRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full min-h-[300px] flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                   
                   {/* Results Header */}
                   <div className={`p-6 border-b border-gray-100 ${routeData.vehicleType === 'plane' ? 'bg-purple-50/50' : 'bg-blue-50/50'}`}>
                     <div className="flex justify-between items-start mb-4">
                       <div>
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{routeData.vehicleType === 'plane' ? 'Estimated Flight Cost' : 'Total Trip Estimate'}</p>
                         <div className="text-4xl font-black text-slate-800 flex items-baseline gap-1">
                           {routeData.region.currency}{routeData.stats.totalCost.toFixed(0)}
                           {routeData.vehicleType === 'plane' && <span className="text-sm font-medium text-gray-400 ml-1">/ person</span>}
                         </div>
                       </div>
                       <div className="flex flex-col items-end gap-2">
                          {routeData.vehicleType === 'plane' ? (
                            <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                              <Icons.Plane className="w-3.5 h-3.5" /> Air Travel
                            </span>
                          ) : routeData.isRealTime ? (
                            <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                              <Icons.Traffic className="w-3.5 h-3.5" /> Live Traffic
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                              <Icons.Car className="w-3.5 h-3.5" /> Standard Route
                            </span>
                          )}
                       </div>
                     </div>
                     <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                       <Icons.Info className="w-4 h-4" /> Detected Region: {routeData.region.name}
                     </div>
                   </div>

                   {/* Results Details Grid */}
                   <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                     
                     {/* Left Details */}
                     <div className="space-y-6">
                       <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-xl ${routeData.vehicleType === 'plane' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                           <Icons.Navigation className="w-6 h-6" />
                         </div>
                         <div>
                           <p className="text-xs font-bold text-gray-400 uppercase">Total Distance</p>
                           <p className="text-xl font-bold text-gray-800">
                             {routeData.stats.distance.toFixed(0)} <span className="text-sm font-medium text-gray-500">{routeData.region.unit === 'imperial' ? 'mi' : 'km'}</span>
                           </p>
                         </div>
                       </div>

                       <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-xl ${routeData.stats.trafficDelay > 0 ? 'bg-red-100 text-red-600' : (routeData.vehicleType === 'plane' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600')}`}>
                           <Icons.Clock className="w-6 h-6" />
                         </div>
                         <div>
                           <p className="text-xs font-bold text-gray-400 uppercase">Est. Duration</p>
                           <p className="text-xl font-bold text-gray-800">
                             {formatDuration(routeData.stats.duration)}
                           </p>
                           {routeData.stats.trafficDelay > 0 && (
                             <p className="text-xs text-red-500 font-bold mt-0.5">+{Math.ceil(routeData.stats.trafficDelay / 60)} min delay</p>
                           )}
                         </div>
                       </div>
                     </div>

                     {/* Right Details (Breakdown) */}
                     <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-center space-y-3">
                       <p className="text-xs font-bold text-gray-400 uppercase mb-1">Cost Breakdown</p>
                       
                       {routeData.vehicleType === 'plane' ? (
                         <>
                            <div className="flex justify-between items-center text-sm">
                             <span className="text-gray-600 flex items-center gap-2"><Icons.Ticket className="w-4 h-4" /> Base Fare</span>
                             <span className="font-bold text-gray-800">{routeData.region.currency}{(routeData.stats.totalCost * 0.85).toFixed(0)}</span>
                           </div>
                           <div className="flex justify-between items-center text-sm">
                             <span className="text-gray-600 flex items-center gap-2">Taxes & Fees</span>
                             <span className="font-bold text-gray-800">{routeData.region.currency}{(routeData.stats.totalCost * 0.15).toFixed(0)}</span>
                           </div>
                         </>
                       ) : (
                         <>
                           <div className="flex justify-between items-center text-sm">
                             <span className="text-gray-600 flex items-center gap-2"><Icons.FuelPump className="w-4 h-4" /> Fuel Cost</span>
                             <span className="font-bold text-gray-800">{routeData.region.currency}{routeData.stats.fuelCost.toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between items-center text-sm">
                             <span className="text-gray-600 flex items-center gap-2"><div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[9px] font-serif font-bold">$</div> Tolls (Est.)</span>
                             <span className="font-bold text-gray-800">{routeData.region.currency}{routeData.stats.tollCost.toFixed(2)}</span>
                           </div>
                         </>
                       )}
                       <div className="h-px bg-gray-200 my-1" />
                       <div className={`flex justify-between items-center text-sm font-bold ${routeData.vehicleType === 'plane' ? 'text-purple-700' : 'text-blue-700'}`}>
                         <span>Total</span>
                         <span>{routeData.region.currency}{routeData.stats.totalCost.toFixed(0)}</span>
                       </div>
                     </div>

                   </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 min-h-[300px]">
                   <Icons.Map className="w-16 h-16 mb-4 opacity-10" />
                   <p className="font-medium">Enter locations to view estimation</p>
                   <p className="text-sm opacity-60">Fill in the form on the left to get started</p>
                 </div>
               )}
            </div>

          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: MAP --- */}
      <div className="flex-1 relative w-full bg-gray-100 min-h-[500px]">
         <div ref={mapContainerRef} className="absolute inset-0 z-0" style={{ minHeight: '500px' }} />
         
         {/* Attribution */}
         <div className="absolute bottom-2 right-2 z-10 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] text-gray-500 shadow-sm pointer-events-none border border-white/50">
           {useRealTime ? "Powered by OpenRouteService" : "Powered by OSRM & OpenStreetMap"}
         </div>
      </div>

    </div>
  );
}