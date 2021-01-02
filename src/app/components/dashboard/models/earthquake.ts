export interface IEarthquake {
  geometry: IGeometry;
  id: string;
  properties: IProperty;
  type: string;
}

interface IGeometry {
  coordinates: string[]
}

interface IProperty {
  time: string;
  place: string;
  mag: number;
}
