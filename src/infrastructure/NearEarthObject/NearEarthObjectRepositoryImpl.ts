import { NearEarthObjectRepository } from '~/domain/NearEarthObject/NearEarthObjectRepository';

import { toNearEarthObjectList } from './NearEarthObjectListAdapter';

const nasaApiUrl =
  'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY';

export class NearEarthObjectRepositoryImpl
  implements NearEarthObjectRepository
{
  async getList() {
    const response = await fetch(nasaApiUrl);

    if (!response.ok) {
      throw new Error(
        'Could not fetch the near earth objects from the NASA API.'
      );
    }

    const apiNearEarthObjectList = await response.json();

    return toNearEarthObjectList(apiNearEarthObjectList);
  }
}
