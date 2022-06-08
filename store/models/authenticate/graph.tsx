import { graphql } from 'graphql';
import {
  MutateResult,
  AuthenticateVariables,
  Authenticate,
  SaveAuthMethodMutationVariables,
  SaveAuthMethodMutation,
  DeleteAuthMethodMutationVariables,
  DeleteAuthMethodMutation,
  ConfirmAuthMethodMutationVariables,
  ConfirmAuthMethodMutation,
  AccountExistenceQueryVariables,
  AccountExistenceQuery,
} from 'types';

const mutation = graphql`
  mutation Authenticate($parametrs: AuthCredentials!) {
    Authenticate(parameters: $parametrs) {
      type
      token
      expiresIn
    }
  }
`;

const accountExistenceQuery = graphql`
  query AccountExistenceQuery($parametrs: SendSecureCodeParameters!) {
    AccountExistence(parameters: $parametrs) {
      result
      message
    }
  }
`;

const saveAuthMethodMutation = graphql`
  mutation SaveAuthMethodMutation($parametrs: SendSecureCodeParameters!) {
    SaveAuthMethod(parameters: $parametrs) {
      result
      message
    }
  }
`;

const confirmAuthMethodMutation = graphql`
  mutation ConfirmAuthMethodMutation($parametrs: AuthCredentials!) {
    ConfirmAuthMethod(parameters: $parametrs) {
      result
      message
    }
  }
`;

const deleteAuthMethodMutation = graphql`
  mutation DeleteAuthMethodMutation($id: ID) {
    DeleteAuthMethod(id: $id) {
      result
      message
    }
  }
`;

export async function AuthenticateMutation(variables: AuthenticateVariables): Promise<MutateResult<Authenticate>> {
  return await mutation.mutation(variables);
}

export async function callAccountExistenceQuery(
  variables: AccountExistenceQueryVariables
): Promise<MutateResult<AccountExistenceQuery>> {
  return await accountExistenceQuery.query(variables);
}

export async function callSaveAuthMethodMutation(
  variables: SaveAuthMethodMutationVariables
): Promise<MutateResult<SaveAuthMethodMutation>> {
  return await saveAuthMethodMutation.mutation(variables);
}

export async function callConfirmAuthMethodMutation(
  variables: ConfirmAuthMethodMutationVariables
): Promise<MutateResult<ConfirmAuthMethodMutation>> {
  return await confirmAuthMethodMutation.mutation(variables);
}

export async function callDeleteAuthMethodMutation(
  variables: DeleteAuthMethodMutationVariables
): Promise<MutateResult<DeleteAuthMethodMutation>> {
  return await deleteAuthMethodMutation.mutation(variables);
}
