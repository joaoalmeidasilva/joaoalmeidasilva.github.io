function updateIframeWithUserLocation() {
    if (navigator.geolocation) {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Create a Google Maps Embed API URL with the user's location and search query
            const mapsUrl = `https://www.google.com/maps/embed/v1/search?q=Locais%20de%20Reciclagem&key=AIzaSyAL6aFLUFMuxcgPORxLRS7fnB_Q9n8F0EY&center=${latitude},${longitude}&zoom=14`;

            // Set the iframe src to the generated URL
            const iframe = document.getElementById('mapIframe');
            iframe.src = mapsUrl;
        }, function(error) {
            // Handle geolocation errors
            alert("Unable to retrieve your location. Please enable location access.");
        });
    } else {
        // Geolocation is not supported by the browser
        alert("Geolocation is not supported by this browser.");
    }
}

// Call the function to update the iframe when the page loads
updateIframeWithUserLocation();