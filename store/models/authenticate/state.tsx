import { IAuthenticateState } from 'types';

export const initState: IAuthenticateState = {
  data: {
    __typename: 'Jwt',
    type: '',
    token: '',
    expiresIn: '',
  },
  errors: {},
  accountExistence: {
    __typename: 'BoolWithMessage',
    result: false,
    message: '',
  },
  saveAuthMethod: {
    __typename: 'BoolWithMessage',
    result: false,
    message: '',
  },
  confirmAuthMethod: {
    __typename: 'BoolWithMessage',
    result: false,
    message: '',
  },
  confirmAuthMethodIsFetching: false,
  deleteAuthMethod: {
    __typename: 'BoolWithMessage',
    result: false,
    message: '',
  },
  isFetching: false,
};
