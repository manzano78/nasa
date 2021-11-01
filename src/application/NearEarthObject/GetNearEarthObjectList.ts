import { NearEarthObjectRepository } from '~/domain/NearEarthObject/NearEarthObjectRepository';
import { NearEarthObject } from '~/domain/NearEarthObject/NearEarthObject';
import { getAverageDiameterInKM } from '~/domain/NearEarthObject/EstimatedDiameterInKM';

function sortNearEarthObjectListByAverageDiameterDesc(
  nearEarthObjectList: NearEarthObject[]
) {
  nearEarthObjectList.sort((nearEarthObject1, nearEarthObject2) => {
    const nearEarthObjectAverageDiameterInKM1 = getAverageDiameterInKM(
      nearEarthObject1.estimatedDiameterInKM
    );
    const nearEarthObjectAverageDiameterInKM2 = getAverageDiameterInKM(
      nearEarthObject2.estimatedDiameterInKM
    );

    return (
      nearEarthObjectAverageDiameterInKM2 - nearEarthObjectAverageDiameterInKM1
    );
  });
}

function filterByOrbitingBody(
  nearEarthObjectList: NearEarthObject[],
  orbitingBody: string
): NearEarthObject[] {
  return nearEarthObjectList.filter((nearEarthObject) =>
    nearEarthObject.orbitingBodies.includes(orbitingBody)
  );
}

function getOrbitingBodyList(nearEarthObjectList: NearEarthObject[]): string[] {
  const orbitingBodies = nearEarthObjectList.reduce(
    (orbitingBodyList, nearEarthObject) => {
      for (const orbitingBody of nearEarthObject.orbitingBodies) {
        orbitingBodyList.add(orbitingBody);
      }

      return orbitingBodyList;
    },
    new Set<string>()
  );

  return Array.from(orbitingBodies);
}

export async function getNearEarthObjectListSortedByAverageDiameterDesc(
  nearEarthObjectRepository: NearEarthObjectRepository,
  orbitingBody?: string
): Promise<[nearEarthObjects: NearEarthObject[], orbitingBodyList: string[]]> {
  let nearEarthObjectList = await nearEarthObjectRepository.getList();
  const orbitingBodyList = getOrbitingBodyList(nearEarthObjectList);

  if (orbitingBody) {
    nearEarthObjectList = filterByOrbitingBody(
      nearEarthObjectList,
      orbitingBody
    );
  }

  sortNearEarthObjectListByAverageDiameterDesc(nearEarthObjectList);

  return [nearEarthObjectList, orbitingBodyList];
}
