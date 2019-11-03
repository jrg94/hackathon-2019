var includedBuildings = ["Oxley Electric Meter", "WATER TRTMNT ST HEAT FLO"]
var files = ["../data/HackathonDataDaily.csv", "../data/HackathonConfig.csv"]
var datasets = {}

function main() {
	files.forEach((file) => d3.csv(file).then(loadThenPlot))
}

function loadThenPlot(dataset) {
	if (dataset.columns[0] == "ID") {
		datasets["Config"] = dataset
	} else {
		datasets["Data"] = dataset
	}
	if (Object.keys(datasets).length == files.length) {
		console.log("adsgfdajh")
		plotLine(datasets)
	}
}

function plotLine(datasets){

	console.log(datasets)
	
	config = datasets["Config"]
	data = datasets["Data"]

	data = isolateBuildings(data)
	data = clean(data)
		
	var w = 600
	var h = 400
	var padding = 40
	
	console.log(d3.extent(data, (d) => new Date(d.Time)))
	console.log(d3.extent(data, (d) => parseFloat(d.CurrentValue)))
	
	// Scales
	var xScale = d3.scaleTime()
		.domain(d3.extent(data, (d) => new Date(d.Time)))
		.range([padding, w - padding * 2])
	
	var yScale = d3.scaleLinear()
		.domain([0, d3.max(data, (d) => parseFloat(d.CurrentValue))])
		.range([h - padding, padding])
		
	var colorScale = d3.scaleOrdinal(d3.schemeAccent).domain(includedBuildings)
	
	// Axes
	var xAxis = d3.axisBottom(xScale).ticks(10)
	var yAxis = d3.axisLeft(yScale).ticks(5)
	
	// Draw
	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)

	svg.append("g")
		.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", (d) => xScale(new Date(d.Time)))
		.attr("cy", (d) => yScale(parseFloat(d.CurrentValue)))
		.attr("r", 3)
		.attr("fill", (d) => colorScale(d.BuildingID))
		.on("mouseover", function (d, i) {
			svg.append("text")
				.attr("x", 20)
				.attr("y", 20)
				.attr("fill", "black")
				.attr("id", "t" + i)
				.text(`Time: ${d.Time}, Current Value: ${d.CurrentValue}`)
			d3.select(this)
				.attr("stroke", "black")
				.attr("r", 7)
		})
		.on("mouseout", function (d, i) {
			d3.select("#t" + i).remove()
			d3.select(this)
				.attr("stroke", "none")
				.attr("r", 3)
		})
		
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis)
		
	svg.append("text")             
		.attr("transform",
			  "translate(" + (w/2) + " ," + 
							 (h) + ")")
		.style("text-anchor", "middle")
		.text("Date");

	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis)
		.selectAll("text")
		.style("text-anchor", "middle")
		.attr("dx", "1em")
		.attr("dy", "-1em")
		.attr("transform", "rotate(-90)")

	svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Energy (kWh)"); 
	
	// Legend
	var legend = d3.select("body")
		.append("svg")
		.attr("width", 400)
		.attr("height", h)
	
	legend.selectAll("mydots")
	  .data(includedBuildings)
	  .enter()
	  .append("circle")
		.attr("cx", 20)
		.attr("cy", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
		.attr("r", 7)
		.style("fill", function(d){ return colorScale(d)})

	// Add one dot in the legend for each name.
	legend.selectAll("mylabels")
	  .data(includedBuildings)
	  .enter()
	  .append("text")
		.attr("x", 40)
		.attr("y", function(d,i){ return 20 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
		.style("fill", function(d){ return colorScale(d)})
		.text(function(d){ return d})
		.attr("text-anchor", "left")
		.style("alignment-baseline", "middle")
	

	background = legend.append("rect")
		.attr("fill", "white")
		.attr("stroke", "black")
		.attr("height", legend.node().getBBox().height + 20)
		.attr("width", legend.node().getBBox().width + 20)
		
	background.lower();
	
}

/**
 * Isolates buildings from a data set based on included buildings.
 * 
 * @param {Array} dataset the dataset
 */
function isolateBuildings(dataset){
	return dataset.filter((d) => 
		includedBuildings.some((item) => 
		item == d.BuildingID))
}

/**
 * Removes unwanted values from the data set.
 * 
 * @param {Array} dataset the dataset
 */
function clean(dataset){
	return dataset.filter((d) => Number(d.CurrentValue) >= 0 
		&& d.Status == "OK")
}

/**
 * Sorts dataset by CurrentValue.
 * 
 * @param {Array} dataset the dataset
 */
function sortByCurrentValue(dataset){
	dataset.sort((b, a) => Number(a.CurrentValue) - Number(b.CurrentValue))
}

main()
