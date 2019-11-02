d3.csv("data/HackathonDataDaily.csv").then(plot)



function plot(dataset){
	console.log("Hello World!")
	console.log(dataset)
	var w = 1200
	var h = 400
	var padding = 40
	
	console.log(d3.extent(dataset, (d) => Number(d.CurrentValue)))
	console.log([h - padding, padding])
	
	var xScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, (d) => Number(d.Time))])
		.range([padding, w - padding * 2])
	
	var yScale = d3.scaleLinear()
		.domain(d3.extent(dataset, (d) => Number(d.CurrentValue)))
		.range([h - padding, padding])
	
	var xAxis = d3.axisBottom().scale(xScale).ticks(5)
	
	var yAxis = d3.axisLeft().scale(yScale).ticks(5);
	
	
	
	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(yAxis);
		
	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + padding + ", 0)")
		.call(yAxis);
}