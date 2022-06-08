import {
  IStoreState,
  LoginType,
  AccountExistenceQueryVariables,
  SaveAuthMethodMutationVariables,
  ConfirmAuthMethodMutationVariables,
  IInputValidationError,
  IInternalError,
} from 'types';

export function parseError({ debugMessage }: IInternalError, { account }: IStoreState): IInputValidationError {
  const { confirmType } = account;
  return {
    data: {
      errors: { ...account.validationError.data.errors, [confirmType.toLowerCase()]: debugMessage },
    },
  };
}

export function formateAccExistRequest({ account }: IStoreState): AccountExistenceQueryVariables {
  const { email, phone, confirmType } = account;
  return {
    parametrs: {
      login: confirmType === LoginType.Email ? email : phone,
      loginType: confirmType,
    },
  };
}

export function formateSaveRequest({ account }: IStoreState): SaveAuthMethodMutationVariables {
  const { email, phone, confirmType } = account;
  return {
    parametrs: {
      login: confirmType === LoginType.Email ? email : phone,
      loginType: confirmType,
    },
  };
}

export function formateConfirmRequest({ account }: IStoreState): ConfirmAuthMethodMutationVariables {
  const { email, phone, confirmType, secureCode } = account;
  return {
    parametrs: {
      login: confirmType === LoginType.Email ? email : phone,
      secureCode,
      loginType: confirmType,
    },
  };
}
