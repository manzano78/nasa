import { NearEarthObject } from '~/domain/NearEarthObject/NearEarthObject';

import { ApiNearEarthObjectList } from './ApiNearEarthObjectList';

export function toNearEarthObjectList(
  apiNearEarthObjectList: ApiNearEarthObjectList
): NearEarthObject[] {
  const { near_earth_objects: apiNearEarthObjects } = apiNearEarthObjectList;

  return apiNearEarthObjects.map((apiNearEarthObject) => {
    const {
      name,
      estimated_diameter: {
        kilometers: {
          estimated_diameter_max: maxDiameterInKM,
          estimated_diameter_min: minDiameterInKM,
        },
      },
      close_approach_data: closeApproachList,
    } = apiNearEarthObject;

    const orbitingBodies = closeApproachList.map((closeApproach) => {
      const { orbiting_body: orbitingBody } = closeApproach;

      return orbitingBody;
    });

    return {
      name,
      orbitingBodies,
      estimatedDiameterInKM: {
        min: minDiameterInKM,
        max: maxDiameterInKM,
      },
    };
  });
}
