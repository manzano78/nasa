import { json, useLoaderData } from 'remix';
import type { HeadersFunction, LoaderFunction, MetaFunction } from 'remix';

import { NearEarthObjectRepositoryImpl } from '~/infrastructure/NearEarthObject/NearEarthObjectRepositoryImpl';
import { getNearEarthObjectListSortedByAverageDiameterDesc } from '~/application/NearEarthObject/GetNearEarthObjectList';
import { NearEarthObjectsChart } from '~/view/molecules/NearEarthObjectsChart';

interface NearEarthObjectsRouteData {
  nearEarthObjects: Array<{
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
}

export const meta: MetaFunction = () => ({
  title: 'Near Earth Objects',
  description:
    'This page displays near Earth objects diameters as charts (NASA data).',
});

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control')!,
  };
};

export const loader: LoaderFunction = async () => {
  const nearEarthObjectRepository = new NearEarthObjectRepositoryImpl();
  const nearEarthObjects =
    await getNearEarthObjectListSortedByAverageDiameterDesc(
      nearEarthObjectRepository
    );

  const routeData: NearEarthObjectsRouteData = {
    nearEarthObjects, // should send an adapted DTO from domain objects for better separation of concerns, but I don't have time haha!
    minEstimatedDiameterLabel: 'Min Estimated Diameter (km)',
    maxEstimatedDiameterLabel: 'Max Estimated Diameter (km)',
    nearEarthObjectsNameLabel: 'NEO name',
    estimatedDiameterLabel: 'Estimated Diameter',
    title: 'Near Earth Objects',
  };

  return json(routeData, {
    headers: {
      'Cache-Control': 'max-age=300', // let's cache for 5 minutes as the data is not supposed to change that often. An Etag should be better
    },
  });
};

export default function NearEarthObjectsRoute() {
  const {
    nearEarthObjects,
    maxEstimatedDiameterLabel,
    minEstimatedDiameterLabel,
    nearEarthObjectsNameLabel,
    estimatedDiameterLabel,
    title,
  } = useLoaderData<NearEarthObjectsRouteData>();

  return (
    <NearEarthObjectsChart
      nearEarthObjects={nearEarthObjects}
      minEstimatedDiameterLabel={minEstimatedDiameterLabel}
      maxEstimatedDiameterLabel={maxEstimatedDiameterLabel}
      nearEarthObjectsNameLabel={nearEarthObjectsNameLabel}
      estimatedDiameterLabel={estimatedDiameterLabel}
      title={title}
      width={800}
      height={600}
    />
  );
}
