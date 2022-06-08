import { IValidateDataObj, IInputValidationError, IProfileField, TravellerFieldEnum } from 'types';
import { isDataNull } from './data';

export function selectProfileField(fields: IProfileField[], type: TravellerFieldEnum) {
  return fields.find(({ type: profileField }) => profileField === type);
}

export const validateField = (
  field: IValidateDataObj,
  updateUserProfileErrors: IInputValidationError
): { result: boolean; errors: IInputValidationError } => {
  let checked = true;
  let errors = updateUserProfileErrors;

  if (checkFieldLength(field)) {
    if (isValidateExist(field)) {
      if (field.validate.func(field.value)) {
        checked = true;
        return getResultField(checked, errors);
      }
      checked = false;
      errors = getError(errors, field, field.validate.message);
      return getResultField(checked, errors);
    }
  } else {
    checked = false;
    errors = getError(errors, field, 'Required field');
  }

  return getResultField(checked, errors);
};

export const validate = (fields: IValidateDataObj[]): { result: boolean; errors: IInputValidationError } => {
  let checked: number = 0;
  let errors: IInputValidationError = {
    data: {
      errors: {
        type: null,
        value: null,
        index: null,
      },
    },
  };

  for (const field of fields) {
    if (checkFieldLength(field)) {
      if (isValidateExist(field)) {
        if (field.validate.func(field.value)) {
          checked++;
          continue;
        }
        if (field.index !== undefined) {
          errors = getIndexedError(errors, field, field.validate.message);
          continue;
        }
        errors.data.errors[field.type] = field.validate.message;
        continue;
      }
      checked++;
      continue;
    } else {
      if (field.index !== undefined) {
        errors = getIndexedError(errors, field, 'Required field');
        continue;
      }
      errors.data.errors[field.type] = 'Required field';
    }
  }
  return getResultFields(fields.length, checked, errors);
};

export function getValidationErrorMessage(
  fieldType: string,
  message: string,
  updateUserProfileErrors: IInputValidationError
) {
  let errors = updateUserProfileErrors;
  return (errors = getError(errors, fieldType, message));
}

const getResultFields = (fieldsLength: number, checked: number, errors: IInputValidationError) => {
  const resultObj = {
    result: null,
    errors: null,
  };
  if (checked === fieldsLength) {
    resultObj.result = true;
  } else {
    resultObj.result = false;
    resultObj.errors = errors;
  }
  return resultObj;
};

const getResultField = (checked: boolean, errors: IInputValidationError) => {
  const resultObj = {
    result: null,
    errors: null,
  };
  if (checked) {
    resultObj.result = true;
  } else {
    resultObj.result = false;
    resultObj.errors = errors;
  }
  return resultObj;
};

const checkFieldLength = (field: IValidateDataObj) => {
  return !isDataNull(field.value) && field.value.length;
};

const isValidateExist = (field: IValidateDataObj) => {
  return field.validate !== undefined;
};

const getIndexedError = (
  errors: IInputValidationError,
  field: IValidateDataObj,
  message: string
): IInputValidationError => {
  errors.data.errors[field.type] = {
    index: field.index,
    message,
  };
  return errors;
};

const getError = (
  errors: IInputValidationError,
  field: IValidateDataObj | string,
  message: string
): IInputValidationError => {
  const copyErrors = {
    data: {
      errors: {
        ...errors.data.errors,
        [typeof field === 'object' ? field.type : field]: message,
      },
    },
  };
  return copyErrors;
};
