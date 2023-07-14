import React, { useEffect, useRef } from "react";

const Maps = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let marker = markerRef.current;

    // Initialize map with default position
    const defaultPosition = { lat: 40.748817, lng: -73.985428 };
    const mapOptions = {
      zoom: 12,
      center: defaultPosition,
      scrollwheel: false,
      zoomControl: true,
      // styles: ...
      // Add your custom map styles here
    };
    map = new google.maps.Map(map, mapOptions);

    // Add event listener to place marker when map is clicked
    map.addListener("click", (event) => {
      placeMarker(event.latLng);
    });

    // Function to place a marker at the specified location
    function placeMarker(location) {
      if (marker) {
        // If a marker already exists, remove it from the map
        marker.setMap(null);
      }
      // Create a new marker at the specified location
      marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Selected Location",
      });
      // Set the new marker as the current marker
      markerRef.current = marker;
    }

    // Add marker at user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Set map center to user's current position
          map.setCenter(userLatLng);

          // Place marker at user's current position
          placeMarker(userLatLng);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  return <div style={{ height: "100vh", width: "100%" }} ref={mapRef}></div>;
};

export default Maps;
