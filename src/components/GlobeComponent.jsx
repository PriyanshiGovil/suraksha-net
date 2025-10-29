// src/components/GlobeComponent.js

import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

export default function GlobeComponent() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoveredPolygon, setHoveredPolygon] = useState(null);
  
  // This is for making the globe responsive
  const globeContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Fetch data
  useEffect(() => {
    fetch('//cdn.jsdelivr.net/npm/three-globe@2.44.1/example/country-polygons/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  // This measures the container and resizes the globe
  useEffect(() => {
    if (globeContainerRef.current) {
      const { width, height } = globeContainerRef.current.getBoundingClientRect();
      setDimensions({ width, height });

      // Add resize observer
      const resizeObserver = new ResizeObserver(entries => {
        if (entries[0]) {
          const { width, height } = entries[0].contentRect;
          setDimensions({ width, height });
        }
      });
      resizeObserver.observe(globeContainerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    // This div wrapper is crucial for measuring the size
    <div 
      ref={globeContainerRef} 
      style={{ width: '100%', height: '100%' }}
    >
      <Globe
        // Use the measured dimensions
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)" // Make background transparent

        // --- All your props from your code ---
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg"
        showGlobe={false}
        showAtmosphere={false}
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonDotResolution={6} // Your original code had 6
        hexPolygonMargin={0.2}
        hexAltitude={0}
        hexPolygonColor={({ properties: d }) =>
          hoveredPolygon === d
            ? "#ff4040" // Red highlight
            : "#00bcd4" // Your cyan color
        }
        hexPolygonLabel={({ properties: d }) => `<b>${d.ADMIN}</b>`}
        onHexPolygonHover={(polygon) => setHoveredPolygon(polygon?.properties || null)}
      />
    </div>
  );
}