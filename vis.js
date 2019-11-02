d3.csv("data/HackathonDataDaily.csv").then(plot)



function plot(dataset){
	console.log("Hello World!")
	console.log(dataset)
	var w = 600
	var h = 400
	var padding = 40
	
	var xScale = d3.scaleTime()
		.domain(d3.extent(dataset, (d) => new Date(d.Time)))
		.range([padding, w - padding * 2])
	
	var yScale = d3.scaleLinear()
		.domain(d3.extent(dataset, (d) => Number(d.CurrentValue)))
		.range([h - padding, padding])
	
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
		.attr("cy", (d) => h - yScale(Number(d.CurrentValue)))
		.attr("r", 5)
		.attr("fill", "green")
		
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis)
		
	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis)
}