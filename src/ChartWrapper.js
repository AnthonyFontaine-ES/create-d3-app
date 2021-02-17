import React, { useRef, useState, useEffect } from 'react';
import D3Chart from './D3Chart';

const ChartWrapper = ({ data, setActiveName }) => {
	const chartArea = useRef(null)
	const [chart, setChart] = useState(null)

	useEffect(() => {
		if (!chart) {
			setChart(new D3Chart(chartArea.current, data, setActiveName))
		}
		else {
			chart.update(data)
		}
	}, [chart, data, setActiveName])

	return (
		<div className="chart-area" ref={chartArea}></div>
	)
}

export default ChartWrapper