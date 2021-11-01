import { useMemo, useState } from 'react'
import {
  json,
  LinksFunction,
  useLoaderData,
  useSubmit,
  useTransition,
} from 'remix';
import type { HeadersFunction, LoaderFunction, MetaFunction } from 'remix';

import { NearEarthObjectRepositoryImpl } from '~/infrastructure/NearEarthObject/NearEarthObjectRepositoryImpl';
import { getNearEarthObjectListSortedByAverageDiameterDesc } from '~/application/NearEarthObject/GetNearEarthObjectList';
import { NearEarthObjectsChart } from '~/view/molecules/NearEarthObjectsChart';
import neoPageStylesUrl from '~/view/styles/neoPageStyles.css';
import { Select } from '~/view/atoms/Select';
import { RadioButtonGroup } from '~/view/atoms/RadioButtonGroup';
import { NearEarthObjectsTable } from '~/view/molecules/NearEarthObjectsTable';

interface NearEarthObjectsRouteData {
  nearEarthObjects: Array<{
    id: string;
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
  orbitalBodyPlaceholder: string;
  orbitingBodies: string[];
  selectedOrbitingBody?: string;
}

type ViewMode = 'table' | 'chart';

const selectedOrbitingBodyParamName = 'selectedOrbitingBody';
const viewModeOptions = [
  {
    value: 'chart',
    label: 'Chart',
  },
  {
    value: 'table',
    label: 'Table',
  }
];

export const meta: MetaFunction = () => ({
  title: 'Near Earth Objects',
  description:
    'This page displays near Earth objects diameters as charts (NASA data).',
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: neoPageStylesUrl,
  },
];

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control')!,
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const selectedOrbitingBody =
    searchParams.get(selectedOrbitingBodyParamName) ?? undefined;
  const nearEarthObjectRepository = new NearEarthObjectRepositoryImpl();
  const [nearEarthObjects, orbitingBodies] =
    await getNearEarthObjectListSortedByAverageDiameterDesc(
      nearEarthObjectRepository,
      selectedOrbitingBody
    );

  const routeData: NearEarthObjectsRouteData = {
    orbitingBodies,
    selectedOrbitingBody,
    nearEarthObjects, // should send an adapted DTO from domain objects for better separation of concerns, but I don't have time haha!
    minEstimatedDiameterLabel: 'Min Estimated Diameter (km)',
    maxEstimatedDiameterLabel: 'Max Estimated Diameter (km)',
    nearEarthObjectsNameLabel: 'NEO name',
    estimatedDiameterLabel: 'Estimated Diameter',
    title: 'Near Earth Objects',
    orbitalBodyPlaceholder: 'Filter by orbital body',
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
    orbitalBodyPlaceholder,
    selectedOrbitingBody,
    orbitingBodies,
  } = useLoaderData<NearEarthObjectsRouteData>();
  const submit = useSubmit();
  const [viewMode, setViewMode] = useState<ViewMode>('chart');
  const transition = useTransition();
  const orbitingBodyOptions = useMemo(() => {
    return orbitingBodies.map((orbitingBody) => ({
      value: orbitingBody,
      label: orbitingBody,
    }));
  }, [orbitingBodies]);
  const isLoading = transition.state !== 'idle';
  const handleOrbitingBodySelect = (selectedOrbitingBody: string) => {
    submit({ [selectedOrbitingBodyParamName]: selectedOrbitingBody });
  };
  const handleOrbitingBodyClear = () => {
    submit({});
  };

  return (
    <>
      <div className="orbital-body-select-container">
        <Select
          allowClear
          className="orbital-body-select"
          options={orbitingBodyOptions}
          onSelect={handleOrbitingBodySelect}
          onClear={handleOrbitingBodyClear}
          placeholder={orbitalBodyPlaceholder}
          defaultValue={selectedOrbitingBody}
          loading={isLoading}
        />
        <RadioButtonGroup
          value={viewMode}
          options={viewModeOptions}
          onChange={(viewMode) => setViewMode(viewMode as ViewMode)}
          className='view-mode-select'
        />
      </div>
      <div className='neo-data-container'>
        {viewMode === 'chart' ? (
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
        ) : (
          <NearEarthObjectsTable
            nearEarthObjects={nearEarthObjects}
            minEstimatedDiameterLabel={minEstimatedDiameterLabel}
            maxEstimatedDiameterLabel={maxEstimatedDiameterLabel}
            nearEarthObjectsNameLabel={nearEarthObjectsNameLabel}
          />
        )}
      </div>
    </>
  );
}
