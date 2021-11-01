import { EstimatedDiameterInKM } from './EstimatedDiameterInKM';

export interface NearEarthObject {
  id: string
  name: string;
  estimatedDiameterInKM: EstimatedDiameterInKM;
  orbitingBodies: string[];
}
