import { Table } from 'antd'
import { useMemo } from 'react'

interface NearEarthObjectsTableProps {
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
}

export function NearEarthObjectsTable(props: NearEarthObjectsTableProps) {
  const {
    maxEstimatedDiameterLabel,
    minEstimatedDiameterLabel,
    nearEarthObjectsNameLabel,
    nearEarthObjects,
  } = props;
  const columns = useMemo(() => {
    return [
      {
        key: 'neoName',
        dataIndex: 'name',
        title: nearEarthObjectsNameLabel,
      },
      {
        key: 'minEstimatedDiameter',
        dataIndex: 'minEstimatedDiameter',
        title: minEstimatedDiameterLabel,
      },
      {
        key: 'maxEstimatedDiameter',
        dataIndex: 'maxEstimatedDiameter',
        title: maxEstimatedDiameterLabel,
      }
    ]
  }, [
    nearEarthObjectsNameLabel,
    minEstimatedDiameterLabel,
    maxEstimatedDiameterLabel,
  ]);

  const dataSource = useMemo(() => {
    return nearEarthObjects.map((nearEarthObject) => {
      const {
        id,
        name,
        estimatedDiameterInKM: {
          min: minEstimatedDiameter,
          max: maxEstimatedDiameter
        }
      } = nearEarthObject;

      return {
        key: id,
        name,
        minEstimatedDiameter,
        maxEstimatedDiameter,
      }
    });
  }, [nearEarthObjects]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
}
