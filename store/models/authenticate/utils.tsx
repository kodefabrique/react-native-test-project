import { SaveAuthMethodMutation_SaveAuthMethod } from 'types';

export function setInitBoolWithMessageState(): SaveAuthMethodMutation_SaveAuthMethod {
  return {
    __typename: 'BoolWithMessage',
    result: null,
    message: '',
  };
}
