d3.csv("data/HackathonDataDaily.csv").then(plot)

includedBuildings = ["Oxley Electric Meter", "BRICKER BUILDING E01"]

function plot(dataset){
	
	//isolateBuilding(dataset, "Oxley Electric Meter")
	//sort(dataset)
	console.log(dataset)
	//clean(dataset)
	
	dataset = isolateBuildings(dataset)
	dataset = clean(dataset)
	
	console.log("Hello World!")
	console.log(dataset)
	var w = 600
	var h = 400
	var padding = 40
	
	console.log(d3.extent(dataset, (d) => new Date(d.Time)))
	console.log(d3.extent(dataset, (d) => parseFloat(d.CurrentValue)))
	
	var xScale = d3.scaleTime()
		.domain(d3.extent(dataset, (d) => new Date(d.Time)))
		.range([padding, w - padding * 2])
	
	var yScale = d3.scaleLinear()
		.domain(d3.extent(dataset, (d) => parseFloat(d.CurrentValue)))
		.range([h - padding, padding])
		
	var colorScale = d3.scaleOrdinal(d3.interpolateInferno)
	
	var xAxis = d3.axisBottom(xScale).ticks(10)
	
	var yAxis = d3.axisLeft(yScale).ticks(5)
	
	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		
	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", (d) => xScale(new Date(d.Time)))
		.attr("cy", (d) => h - yScale(parseFloat(d.CurrentValue)))
		.attr("r", 5)
		.attr("fill", (d) => parseFloat(d.CurrentValue) > 0 ? "green" : "red")
		
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis)
		
	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis)
}

/**
 * Removes all buildings don't match BuildingID.
 */
/**function isolateBuilding(dataset, name){
	for(var i = 0; i < dataset.length; i++){
		var obj = dataset[i]
		if(obj.BuildingID != name){
			dataset.splice(i, 1)
			i--
		}
	}
}
*/

function isolateBuildings(dataset){
	return dataset.filter((d) => 
		includedBuildings.some((item) => 
		item == d.BuildingID))
}


/**
 * Removes unwanted values from the data set.
 */
function clean(dataset){
	return dataset.filter((d) => Number(d.CurrentValue) >= 0 
		&& d.Status == "OK")
}

/**
 * Sorts dataset by CurrentValue.
 */
function sortByCurrentValue(dataset){
	dataset.sort((b, a) => Number(a.CurrentValue) - Number(b.CurrentValue))
}








