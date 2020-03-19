import React from 'react'
import CanvasJSReact from "../assets/canvasjs.react";

// {title,date} props u bu sekilde de tanimlayabiliriu
function PieChart (props) {

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const {title, date, chartData} = props;

    const options = {
			animationEnabled: true,
			exportEnabled: true,
			title:{
				text: ""
			},
			data: [{
                type: "pie",
                startAngle: 0 ,
                toolTipContent: "<b>{label}</b>: {y}",
                indexLabel: "{label}-{y}",
                showInLegend:'true',
                legendText:'{label}',
                indexLabelFontSize:16,
                dataPoints: chartData
			}]
	}

	return (
        <div>
            <h2 className='text-center my-3'>{title}</h2>
            <p className='text-center mt-5'>{date}</p>
			<CanvasJSChart options = {options}/>
		</div>
	);
}


export default PieChart;
