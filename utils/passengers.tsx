import {
  IStoreState,
  IBookCustomer,
  IBookingContact,
  AviaPassengerType,
  IBookingTraveller,
  TravellerFieldEnum,
} from 'types';
import { PASSENGERS_TITLE, PASSANGER_GENDER, PASSENGERS_DOC } from 'values';

export function selectPassengerTitle({
  type = AviaPassengerType.ADT,
  prefix = '',
  postfix = '',
  fallback = 'None',
  change = (value: string) => value,
}: {
  type: AviaPassengerType;
  prefix?: string;
  postfix?: string;
  fallback?: string;
  change?: (value: string) => string;
}) {
  const value = change(PASSENGERS_TITLE[type]) || fallback;

  return `${prefix}${value}${postfix}`;
}

export function selectPassengerGender(gener: string): string {
  return PASSANGER_GENDER[gener] || '';
}

export function selectPassengerDoc(type: string) {
  return PASSENGERS_DOC[type] || '';
}

export function selectField(travellers: IBookingTraveller[], travellerOrder: number, type: TravellerFieldEnum) {
  return travellers?.[travellerOrder]?.contact?.fields?.find?.(({ type: contactField }) => contactField === type);
}

export function selectOrderField({ order }: IStoreState, travellerOrder: number, type: TravellerFieldEnum) {
  return order?.data?.travellers?.[travellerOrder]?.values?.find(({ type: contactField }) => contactField === type);
}

export function selectFieldFromContact(contact: IBookingContact, type: TravellerFieldEnum) {
  return contact.fields.find(({ type: fieldType }) => fieldType === type);
}

export function selectFieldFromCustomer(customer: IBookCustomer, type: TravellerFieldEnum) {
  return customer.fields.find(({ type: fieldType }) => fieldType === type);
}

export function calcFilledContactNames({
  contact,
  formate = (firstName: string, lastName: string) => `${firstName} ${lastName}`,
}: {
  contact: IBookingContact;
  formate?: (firstName: string, lastName: string) => string;
}) {
  try {
    const firstName = selectFieldFromContact(contact, TravellerFieldEnum.FirstName).value || '';
    const lastName = selectFieldFromContact(contact, TravellerFieldEnum.LastName).value || '';

    if (!firstName && !lastName) {
      return '';
    }

    if (firstName && lastName) {
      return formate(firstName, lastName);
    }

    if (firstName) {
      return firstName;
    }

    return lastName;
  } catch {
    return '';
  }
}

export function calcContactNames(contact: IBookingContact, order: number = 0) {
  const name = calcFilledContactNames({ contact });

  return (
    name ||
    selectPassengerTitle({
      type: contact.type,
      prefix: `${order + 1} `,
    })
  );
}

export function capitalizeFirstChar(value: string = '') {
  const [first, ...rest] = value;
  const firstChar = first || '';
  const restChars = rest || [];
  return `${firstChar.toUpperCase()}${restChars.join('').toUpperCase()}`;
}
