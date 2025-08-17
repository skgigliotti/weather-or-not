// Wait for the map to be initialized
{
    $(window).on('map:init', function (e) {
        map = e.originalEvent.detail.map;
        map.on('click', function (e) {
            addMarker(e)
        })
        map.on('draw:edited', function (e) {
            var layers = e.layers._layers
            var coordinates;
            Object.keys(layers).forEach(function (key) {

                coordinates = layers[key]._latlng;
            });
        });

        function get_stats(coordinates) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "GET",
                    url: "http://127.0.0.1:8000/get-stats",
                    data: {
                        'lat': coordinates.lat,
                        'lng': coordinates.lng,
                    },
                    dataType: "json",
                    success: function (response) {
                        resolve(response)
                    },
                    error: function (rs, e) {
                        console.log('ERROR', e, rs);
                        reject(e)
                    }
                })
            });
        }
        function addMarker(e) {
            // Add marker to map at click location; add popup window
            get_stats(e.latlng).then(function (stats) {
                var marker = new L.marker(e.latlng).addTo(map);
                console.log(stats)
                marker.bindPopup(stats.temperature).openPopup();
            })
        }
    });
}
