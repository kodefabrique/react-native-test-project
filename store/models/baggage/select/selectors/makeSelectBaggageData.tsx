import {
  IStoreState,
  BaggageType,
  DisplayBaggageType,
  ISelectOptionItem,
  ISelectBaggageItem,
  ISelectBaggageData,
  ISelectBaggageDataRow,
  ISelectBaggageDataRowItem,
  ISelectedFareFamily,
  FareFamilyOptionsType,
  FareFeaturePaymentType,
  IBookingTraveller,
  IBaggageData,
} from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector } from 'utils';
import { getOrderStack } from '../common';
import { baggage as baggageDomain } from 'core';

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

const getBaggage = createLoggedSelector(({ baggage }: IStoreState) => {
  return baggage.data;
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
  return availableBaggages
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

export function makeSelectBaggageData() {
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
        const counted = baggageDomain.countBaggage(available, travellers[props.travellerOrder], props.segmentOrder);
        const addable = baggageDomain.canAdded(counted, travellers[props.travellerOrder], props.segmentOrder);

        return [
          ...included.map((item) => ({
            type: DisplayBaggageType.OPTION,
            item,
          })),
          ...addable.map((item) => ({
            type: DisplayBaggageType.DATA,
            item,
          })),
        ].reduce(extractRow, []);
      },
      []
    )
  );
}
