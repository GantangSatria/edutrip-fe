export type FlightDestinationEstimate = {
  airportName: string;
  airportCode: string;
  airlines: string;
  priceIdr: number;
};

export type FlightOriginGroup = {
  originTitle: string;
  destinations: FlightDestinationEstimate[];
};
