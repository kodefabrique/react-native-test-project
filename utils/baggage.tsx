import { IBaggageData, IBookingState, BaggageType } from 'types';
import { MAX_BAGGAGE } from 'values';

export function convertBaggageTypeToTitle(type: BaggageType): string {
  const switchType = {
    [BaggageType.CarryOn]: 'Carry on',
    [BaggageType.CheckedBaggage]: 'Checked baggage',
    [BaggageType.BaggageExcess]: 'Baggage excess',
    [BaggageType.PetInCabin]: 'Pet in cabin',
    [BaggageType.PetInHold]: 'Pet in hold',
    [BaggageType.SportingEquipment]: 'Sporting equipment',
  };

  return switchType[type] || switchType[BaggageType.CheckedBaggage];
}

export function calcCurrentBaggageCountsByType(
  { travellers }: IBookingState,
  travellerOrder: number,
  segmentOrder: number
) {
  return travellers[travellerOrder].baggage[segmentOrder].reduce((acc, next) => {
    return acc[next.baggageType]
      ? {
          ...acc,
          [next.baggageType]: acc[next.baggageType] + 1,
        }
      : {
          ...acc,
          [next.baggageType]: 1,
        };
  }, {});
}

export function isBaggageCountMax(baggageType: BaggageType, counts: { [key: string]: number }): boolean {
  return counts[baggageType] >= MAX_BAGGAGE;
}

export function countBaggageBySegment(
  segment: IBaggageData[]
): {
  baggage: IBaggageData;
  count: number;
}[] {
  return segment.reduce((acc, next) => {
    const target = acc.find(({ baggage }) => baggage.id === next.id);

    if (target) {
      return acc.map((item) =>
        item.baggage.id === next.id
          ? {
              ...item,
              count: item.count + 1,
            }
          : item
      );
    }

    return [
      ...acc,
      {
        baggage: next,
        count: 1,
      },
    ];
  }, []);
}
