import * as d3 from 'd3'

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 }
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM

class D3Chart {
	constructor(element, data, setActiveName) {
		let vis = this

		vis.setActiveName = setActiveName;
		
		vis.g = d3.select(element)
			.append("svg")
				.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
				.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
				.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

		vis.xScale = d3.scaleLinear()
			.range([0, WIDTH]);

		vis.yScale = d3.scaleLinear()
			.range([HEIGHT, 0])

		vis.xAxisGroup = vis.g.append('g')
			.attr('transform', `translate(0, ${HEIGHT})`);
		vis.yAxisGroup = vis.g.append('g');

		vis.g.append('text')
			.attr('x', WIDTH / 2)
			.attr('y', HEIGHT + 40)
			.attr('font-size', 20)
			.attr('text-anchor', 'middle')
			.text("Age");

		vis.g.append('text')
			.attr('x', - HEIGHT / 2)
			.attr('y', -50)
			.attr('transform', 'rotate(-90)')
			.attr('font-size', 20)
			.attr('text-anchor', 'middle')
			.text("Height in CM");

		vis.update(data)		
	}

	update(data) {
		let vis = this
		vis.data = data;

		vis.xScale.domain([0, d3.max(vis.data, d => Number(d.age))]);	
		vis.yScale.domain([0, d3.max(vis.data, d => Number(d.height))]);

		const xAxisCall = d3.axisBottom(vis.xScale);
		const yAxisCall = d3.axisLeft(vis.yScale);

		vis.xAxisGroup.transition(1000).call(xAxisCall);
		vis.yAxisGroup.transition(1000).call(yAxisCall);

		// data join
		const circles = vis.g.selectAll('circle')
			.data(vis.data, d => d.name);

		// exit
		circles.exit()
			.transition(1000)
				.attr('cy', vis.yScale(0))
				.remove();

		// update `
		circles
			.transition(1000)
			.attr('cx', d => vis.xScale(d.age))
			.attr('cy', d => vis.yScale(d.height))

		// enter
		circles.enter()
			.append('circle')
				.attr('cx',  vis.xScale(0))
				.attr('cy', vis.yScale(0))
				.attr('r', 7)
				.attr('fill', 'red')
				.on('mouseenter', d => vis.setActiveName(d.name))
				.on('mouseleave', d => vis.setActiveName(null))
			.transition(1000)
				.attr('cx', d => vis.xScale(d.age))
				.attr('cy', d => vis.yScale(d.height));
				
	}
}

export default D3Chart