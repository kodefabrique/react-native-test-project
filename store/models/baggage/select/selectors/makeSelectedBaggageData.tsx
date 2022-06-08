// @ts-nocheck
// TODO: Исправить ошибки TS
import { createSelector } from 'reselect';
import { getOrderStack } from '../common';
import {
  ISelectedFareFamily,
  IStoreState,
  IBookingTraveller,
  IBaggageData,
  ISelectBaggageData,
  DisplayBaggageType,
  FareFamilyOptionsType,
  FareFeaturePaymentType,
  BaggageType,
  ISelectBaggageItem,
  ISelectOptionItem,
  ISelectBaggageDataRow,
  ISelectBaggageDataRowItem,
} from 'types';
import { createLoggedSelector } from 'utils';

const getSegmentOrder = createLoggedSelector(
  (
    _: IStoreState,
    props: {
      travellerOrder: number;
      segmentOrder: number;
    }
  ) => {
    return props.segmentOrder;
  },
  0
);

const getProps = createLoggedSelector(
  (
    _: IStoreState,
    props: {
      travellerOrder: number;
      segmentOrder: number;
    }
  ) => {
    return props;
  },
  {
    travellerOrder: 0,
    segmentOrder: 0,
  }
);

const getBaggage = createLoggedSelector(({ booking }: IStoreState) => {
  return booking.travellerServices.map((traveller) => {
    return traveller.services.gdsServices.services.find((item) => {
      if (item.service.type === 'Baggage') {
        return {
          id: item.service.id,
          type: item.service.type,
          price: item.service.price,
          allowedSegments: item.service.allowedSegments,
          allowedPassengers: item.service.allowedPassengers,
          name: item.service.name,
          description: item.service.description,
          rfisc: item.service.rfisc,
          count: item.count,
          canBeAdded: item.service.canBeAdded,
        };
      }
    });
  });
}, []);

function calcIncludedOptions(segment: ISelectedFareFamily): ISelectOptionItem[] {
  const { options } = segment.priceInfo.fareFamily;

  return options
    .filter((option) => option)
    .filter(({ type }) => isIncludedBaggage(type))
    .filter(({ availability }) => isBaggageFree(availability));
}

function isIncludedBaggage(type: FareFamilyOptionsType) {
  return type === FareFamilyOptionsType.Baggage || type === FareFamilyOptionsType.CarryOn;
}

function isBaggageFree(availability: FareFeaturePaymentType) {
  return availability === FareFeaturePaymentType.Free;
}

function isNotSportEqupment(baggageType: BaggageType) {
  return baggageType !== BaggageType.SportingEquipment;
}

function isNotBaggageExcess(baggageType: BaggageType) {
  return baggageType !== BaggageType.BaggageExcess;
}

function calcAvailableOptions(
  availableBaggages: IBaggageData[],
  props: {
    travellerOrder: number;
    segmentOrder: number;
  },
  flightInfoLength: number
): ISelectBaggageItem[] {
  const formatedAvailableBaggages = availableBaggages.map((item) => {
    return {
      id: item.service.id,
      type: item.service.type,
      price: item.service.price,
      allowedSegments: item.service.allowedSegments,
      allowedPassengers: item.service.allowedPassengers,
      name: item.service.name,
      description: item.service.description,
      rfisc: item.service.rfisc,
      count: item.count,
      isCanAdded: item.service.canBeAdded,
      confirmedCount: item.confirmedCount,
    };
  });
  return formatedAvailableBaggages
    .filter(({ baggageType }) => isNotSportEqupment(baggageType))
    .filter(({ baggageType }) => isNotBaggageExcess(baggageType))
    .filter(({ allowedSegments }) => {
      const allowedIds = allowedSegments?.[props?.segmentOrder] || [];
      return flightInfoLength === allowedIds.length;
    })
    .sort(({ price: { amount: a } }, { price: { amount: b } }) => a - b);
}

function extractRow(acc: ISelectBaggageDataRow[], item: ISelectBaggageDataRowItem) {
  if (!acc.length) {
    return [[item]];
  }

  const lastRow = acc[acc.length - 1];

  if (lastRow.length < 2) {
    acc[acc.length - 1] = [...lastRow, item];
    return [...acc];
  }

  return [...acc, [item]];
}

export function makeSelectedBaggageData() {
  const selectSelectedSegment = createSelector(
    getOrderStack,
    getSegmentOrder,
    createLoggedSelector((seletedStack: ISelectedFareFamily[], segmentOrder: number) => {
      return seletedStack[segmentOrder];
    }, null)
  );

  return createSelector(
    selectSelectedSegment,
    ({ booking }: IStoreState) => booking.travellers,
    getBaggage,
    getProps,
    createLoggedSelector(
      (
        segment: ISelectedFareFamily,
        travellers: IBookingTraveller[],
        availableBaggages: IBaggageData[],
        props: {
          travellerOrder: number;
          segmentOrder: number;
        }
      ): ISelectBaggageData => {
        const included = calcIncludedOptions(segment);
        const available = calcAvailableOptions(availableBaggages, props, segment.flightInfo.length);

        if (available.length === 0) {
          return [];
        }

        return [
          ...included.map((item: any) => ({
            type: DisplayBaggageType.OPTION,
            item,
          })),
          ...available.map((item: any) => ({
            type: DisplayBaggageType.DATA,
            item,
          })),
        ].reduce(extractRow, []);
      },
      []
    )
  );
}
