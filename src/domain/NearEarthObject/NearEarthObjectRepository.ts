import { NearEarthObject } from './NearEarthObject';

export interface NearEarthObjectRepository {
  getList(): Promise<Array<NearEarthObject>>;
}
