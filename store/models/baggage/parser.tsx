import { IStoreState, IBaggageData, OrderAdditionalServiceGdsServiceServiceType } from 'types';

export function parseData({ order }: IStoreState): IBaggageData[] {
  return order.data.additionalServices.gdsServices.services.filter(
    ({ type }) => type === OrderAdditionalServiceGdsServiceServiceType.Baggage
  ) as IBaggageData[];
}
