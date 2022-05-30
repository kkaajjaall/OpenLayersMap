window.onload = init;
function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [0,0],
            zoom: 4,
            maxZoom: 16,
            minZoom: 2,
            rotation: 0.5,
        }),
        target: 'js_map'
    })
    // click points
    map.on('click', function (e) {
        console.log("click is done");
        console.log(e.coordinate);
    })
    //default layer
    const openStreetMapStanderd= new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible:true,
        title:"OSMHumanitarianStanderd"
    })
    // layers show
    // open Street Map Humanitarian
    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url:'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible:false,
        title:"OSMHumanitarian"
    })
    // stemen Terrain
    const stemenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
            attributions:"Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
        }),
        visible:false,
        title:"stemenTerrain"
    })
    //stemen Toner
    const stemenToner = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            attributions:"Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
        }),
        visible:false,
        title:"stemenToner"
    })
    // Stemen Water Color
    const stemenWaterColor = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
            attributions:"Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
        }),
        visible:false,
        title:"stemenWaterColor"
    })
    // var boundries = new ol.source.Vector({
    //     url: 'yourboundariesdata.geojson',
    //     format: new ol.format.GeoJSON()
    //   });

    // layer group
    const baseLayersGroup = new ol.layer.Group({
        layers:[
            openStreetMapStanderd,openStreetMapHumanitarian,stemenTerrain,stemenToner,stemenWaterColor
        ]
    })
    map.addLayer(baseLayersGroup);

    // switch of layers
    const elements = document.querySelectorAll('.sidebar > input[type=checkbox]');
    for(let element of elements){
        element.addEventListener('change',function(){
            let value = this.value;
            baseLayersGroup.getLayers().forEach(function(layer){
                let title = layer.get('title');
                layer.setVisible(title === value );
                console.log(title);
            })
        })
    }
    // vector layer
    const vectorLayer = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url:'./liberies/data/map .geojson',
            format:new ol.format.GeoJSON()
        }),
        visible:true,
        title:"Vector",

    });
    map.addLayer(vectorLayer);
}


  
 

