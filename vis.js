d3.csv("data/HackathonDataDaily.csv").then(plot)

includedBuildings = ["Oxley Electric Meter", "BRICKER BUILDING E01", "Kennedy Elec Consumption"]

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
	
	// Scales
	var xScale = d3.scaleTime()
		.domain(d3.extent(dataset, (d) => new Date(d.Time)))
		.range([padding, w - padding * 2])
	
	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, (d) => parseFloat(d.CurrentValue))])
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
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", (d) => xScale(new Date(d.Time)))
		.attr("cy", (d) => yScale(parseFloat(d.CurrentValue)))
		.attr("r", 3)
		.attr("fill", (d) => colorScale(d.BuildingID))
		
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis)
		
	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis)
		.selectAll("text")
		.style("text-anchor", "middle")
		.attr("dx", "1em")
		.attr("dy", "-1em")
		.attr("transform", "rotate(-90)")
	
	legend = svg.append("g")
	
	
	legend.append("rect")
		.attr("fill", "white")
		.attr("stroke", "black")
		.attr("height", 15 + 25 * includedBuildings.length)
		.attr("width", 100)//getMaxTextWidth(includedBuildings))
	
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



/*function getMaxTextWidth(textArray){
	var max = [0, 0]
	for(var i = 0; i < textArray.length; i++){
		var size = textSize(textArray[i])
		if(size["width"] > max["width"]){
			max = size
		}
	}
	return max[0]
}

// Usage: textSize("This is a very long text"); 
// => Return: Object {width: 140, height: 15.453125}
function textSize(text) {
    var container = d3.select('body').append('svg');
    container.append('text').attr({ x: -99999, y: -99999 }).text(text);
    var size = container.node().getBBox();
    container.remove();
    return { width: size.width, height: size.height };
}



*/
