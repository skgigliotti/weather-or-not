// Wait for the map to be initialized
function initmaps() {
    console.log('earh')
    $(window).on('map:init', function (e) {
        console.log('init heehe')
        map = e.originalEvent.detail.map;

        map.on('draw:created', function (e) {
            const coordinates = (37.77396955751061, -122.43518615980867)

            call_ajax(coordinates);

        });
        // map.on('draw:edited', function (e) {
        //     var layers = e.layers._layers
        //     var coordinates;
        //     Object.keys(layers).forEach(function (key) {

        //         coordinates = layers[key]._latlng;
        //         //console.log(coordinates)
        //     });
        //     call_ajax(coordinates);
        // });

        function call_ajax(coordinates) {

            $.ajax({
                type: "GET",
                url: "https://api.open-meteo.com/v1/forecast",
                data: {
                    'lat': '37.77396955751061',
                    'lng': '-122.43518615980867',
                },
                dataType: "json",
                success: function (response) {
                    console.log('hello: ', response)
                    // $('#id_province_id').val(response.province_id); // Select the option with a value of '1'
                    // $('#id_province_id').trigger('change'); // Notify any JS components that the value changed
                },
                error: function (rs, e) {
                    console.log('ERROR obteniendo el bounding box');
                }
            });
        }
    });
}
