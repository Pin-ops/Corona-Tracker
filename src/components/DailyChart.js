import React from 'react'
import CanvasJSReact from "../assets/canvasjs.react";


function DailyChart (props) {

    const {totalConfirmed, totalDeaths} = props

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: ""
        },
        axisY: {
          title: "(Number of Cases)"
        },
        toolTip: {
          shared: true
        },
        legend: {
          verticalAlign: "center",
          horizontalAlign: "right",
          reversed: true,
          cursor: "pointer",
        },
        data: [
          {
              type: "stackedArea",
              name: "Death",
              showInLegend: true,
              xValueFormatString: "dd/mm/yyyy", //it doesn't matter when they are not capital letters
              dataPoints: totalDeaths,
              color:'#f64b3c'
          },
          {
              type: "stackedArea",
              name: "Confirmed",
              showInLegend: true,
              xValueFormatString: "DD/MM/YYYY",
              dataPoints: totalConfirmed,
              color:'#30475e'
          }
      ]
  }



	return (
        <div className="my-5 p-3 shadow">
			<CanvasJSChart options = {options}/>
		</div>
	);
}


export default DailyChart;
