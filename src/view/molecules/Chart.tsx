import { Chart as ReactGoogleChart } from 'react-google-charts';
import type { ReactGoogleChartProps } from 'react-google-charts/dist/types';

import { DefaultChartLoader } from '~/view/atoms/DefaultChartLoader';
import { DefaultChartError } from '~/view/atoms/DefaultChartError';

export function Chart(props: ReactGoogleChartProps) {
  const {
    loader = <DefaultChartLoader />,
    errorElement = <DefaultChartError />,
    ...baseProps
  } = props;

  return (
    <ReactGoogleChart
      {...baseProps}
      loader={loader}
      errorElement={errorElement}
    />
  );
}
