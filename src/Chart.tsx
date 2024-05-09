import React, { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Chart = (props: HighchartsReact.Props) => {
  const { chartNameCount, columnChartData } = props;
  console.log("columnChartData", columnChartData);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const chartColumnComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = {
    title: {
      text: "All category",
    },
    series: [
      {
        type: "pie",
        data: [...chartNameCount],
      },
    ],
  };

  const columnChart: Highcharts.Options = {
    // chart: {
    // },
    title: {
      text: "Products in selected Category",
      align: "left",
    },
    xAxis: {
      categories: columnChartData?.title ? [...columnChartData.title] : [],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: columnChartData?.category ? columnChartData?.category : "",
      },
    },
    tooltip: {},
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: columnChartData?.category ? columnChartData?.category : "",
        data: columnChartData?.price ? [...columnChartData?.price] : [],
        type: "column",
      },
    ],
  };

  return (
    <>
      {columnChartData?.title ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={columnChart}
          ref={chartColumnComponentRef}
          {...props}
        />
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
          {...props}
        />
      )}
    </>
  );
};
