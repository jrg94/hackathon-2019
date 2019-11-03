load()
function load() {
    var worldmap = d3.json("../data/data.gdb.geojson")
    var config = d3.csv("../data/HackathonConfig.csv")

    Promise.all([worldmap, config]).then(plot, (error) => console.log(error))
}

function plot(datasets) {
    console.log(datasets)
    var w = 600
    var h = 400

    var projection = d3.geoMercator()//.translate([w/2, h/2]).scale(2200).center([0,40])
    var path = d3.geoPath().projection(projection)

    var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)

    svg.selectAll("path")
        .data(datasets[0].features)
        .enter()
        .append("path")
        .attr("class","continent")
        .attr("d", path)
}
