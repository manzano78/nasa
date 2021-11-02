export interface ApiNearEarthObjectList {
  near_earth_objects: Array<{
    name: string;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
  }>;
}
