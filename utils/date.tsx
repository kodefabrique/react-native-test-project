import Moment from 'moment';

export const toTypeString = (date: string | Date) => {
  const formatedDate = Moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY');
  return formatedDate;
};

export const toTypeDate = (date: string) => {
  if (date) {
    const dateFormatValid = Moment(date, 'DD.MM.YYYY').isValid();
    const dateFormated = dateFormatValid ? Moment(date, 'DD.MM.YYYY').toDate() : Moment(date, 'YYYY-MM-DD').toDate();
    return dateFormated;
  }
  return new Date();
};

export const validateDate = (date: string) => {
  const validate = Moment(date, 'DD.MM.YYYY').isValid();
  const formatedDate = validate
    ? Moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY')
    : Moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
  const dateNow = Moment().format('DD.MM.YYYY');

  if (dateNow === formatedDate) {
    return '';
  }
  return Moment(formatedDate, 'DD.MM.YYYY').isValid() ? formatedDate : '';
};
