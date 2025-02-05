function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Create a map centered at the user's location
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: userLocation,
                    zoom: 14,
                    gestureHandling: "cooperative" // Make the map touch-friendly
                });

                // Add a marker for the user's location
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Location",
                    icon: {
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }
                });

                // Perform a nearby search for recycling locations
                const service = new google.maps.places.PlacesService(map);
                const request = {
                    location: userLocation,
                    radius: '5000', // Search within 5000 meters
                    query: 'Locais de Reciclagem' // Search query
                };

                service.textSearch(request, function(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (let i = 0; i < results.length; i++) {
                            // Add a marker for each recycling location
                            new google.maps.Marker({
                                position: results[i].geometry.location,
                                map: map,
                                title: results[i].name,
                                icon: {
                                    url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                }
                            });
                        }
                    }
                });
            },
            function(error) {
                alert("Unable to retrieve your location. Please enable location access.");
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}