export interface EstimatedDiameterInKM {
  min: number;
  max: number;
}

export function getAverageDiameterInKM(
  estimatedDiameterInKM: EstimatedDiameterInKM
) {
  const { min: minEstimatedDiameterInKM, max: maxEstimatedDiameterInKM } =
    estimatedDiameterInKM;

  return (minEstimatedDiameterInKM + maxEstimatedDiameterInKM) / 2;
}
