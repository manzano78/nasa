import { EstimatedDiameterInKM } from './EstimatedDiameterInKM';

export interface NearEarthObject {
  name: string;
  estimatedDiameterInKM: EstimatedDiameterInKM;
  orbitingBodies: string[];
}
