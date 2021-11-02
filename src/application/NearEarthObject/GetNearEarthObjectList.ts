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

export async function getNearEarthObjectListSortedByAverageDiameterDesc(
  nearEarthObjectRepository: NearEarthObjectRepository
): Promise<Array<NearEarthObject>> {
  const nearEarthObjectList = await nearEarthObjectRepository.getList();

  sortNearEarthObjectListByAverageDiameterDesc(nearEarthObjectList);

  return nearEarthObjectList;
}
