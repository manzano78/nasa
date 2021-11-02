import { useMemo } from 'react';

import { Chart } from './Chart';

interface NearEarthObjectsChartProps {
  nearEarthObjects: Array<{
    id: string
    name: string;
    estimatedDiameterInKM: {
      min: number;
      max: number;
    };
  }>;
  minEstimatedDiameterLabel: string;
  maxEstimatedDiameterLabel: string;
  nearEarthObjectsNameLabel: string;
  estimatedDiameterLabel: string;
  title: string;
  width: number;
  height: number;
}

export function NearEarthObjectsChart(props: NearEarthObjectsChartProps) {
  const {
    estimatedDiameterLabel,
    nearEarthObjectsNameLabel,
    maxEstimatedDiameterLabel,
    nearEarthObjects,
    minEstimatedDiameterLabel,
    title,
    height,
    width,
  } = props;

  const chartData = useMemo(() => {
    return nearEarthObjects.reduce(
      (chartData, nearEarthObject) => {
        chartData.push([
          nearEarthObject.name,
          nearEarthObject.estimatedDiameterInKM.min,
          nearEarthObject.estimatedDiameterInKM.max,
        ]);
        return chartData;
      },
      [
        [
          nearEarthObjectsNameLabel,
          minEstimatedDiameterLabel,
          maxEstimatedDiameterLabel,
        ],
      ] as Array<Array<string | number>>
    );
  }, [
    nearEarthObjects,
    minEstimatedDiameterLabel,
    maxEstimatedDiameterLabel,
    nearEarthObjectsNameLabel,
  ]);

  return (
    <Chart
      legendToggle
      width={width}
      height={height}
      data={chartData}
      chartType="BarChart"
      options={{
        title,
        chartArea: { width: '30%' },
        hAxis: {
          title: estimatedDiameterLabel,
          minValue: 0,
        },
        vAxis: {
          title: nearEarthObjectsNameLabel,
        },
      }}
    />
  );
}
