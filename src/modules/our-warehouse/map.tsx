'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  location: {
    coordinates: [number, number]
  }
}

const MapComponent = ({ location }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null)

  // Function to open location in Google Maps
  const openInGoogleMaps = () => {
    const [lat, lng] = location.coordinates
    window.open(`https://www.google.com/maps?q=${lat},${lng}&z=16`, '_blank')
  }

  useEffect(() => {
    const icon = L.icon({
      iconUrl: '/assets/our-warehouse/marker.png',
      iconRetinaUrl: '/assets/our-warehouse/marker.png',
      shadowUrl: '/assets/our-warehouse/marker-shadow.png',
      iconSize: [41, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    })

    // Set default icon for all markers
    L.Marker.prototype.options.icon = icon

    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        zoomControl: false,
        attributionControl: false,
      }).setView(location.coordinates, 16)

      // Google Maps Layer with correct configuration
      L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© Google Maps',
      }).addTo(mapRef.current)

      L.marker(location.coordinates).addTo(mapRef.current)

      const zoomControl = L.control.zoom({
        position: 'bottomright',
      })
      mapRef.current.addControl(zoomControl)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [location])

  return (
    <div className="relative">
      <div
        id='map'
        className='aspect-[4/3] h-full w-auto border sm:aspect-video md:aspect-square lg:aspect-[4/3] xl:aspect-video'
      />
      <button
        onClick={openInGoogleMaps}
        className="absolute bottom-4 left-4 z-[400] bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 rounded-md flex items-center gap-2"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        View Larger Map
      </button>
    </div>
  )
}

export default MapComponent