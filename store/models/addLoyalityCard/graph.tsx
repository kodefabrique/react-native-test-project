import { graphql } from 'graphql';
import {
  MutateResult,
  ResetFfpPasswordParameters,
  ResetFfpPasswordResult,
  SendNewFfpPasswordParameters,
  SendNewFfpPasswordResult,
} from 'types';

const sendResetFfpPasswordCode = graphql`
  mutation SendResetFfpPasswordCode($email: String!, $airlineCode: String!) {
    SendResetFfpPasswordCode(email: $email, airlineCode: $airlineCode)
  }
`;

export async function SendResetFfpPasswordCode(
  parameters: ResetFfpPasswordParameters
): Promise<MutateResult<ResetFfpPasswordResult>> {
  return await sendResetFfpPasswordCode.mutation(parameters);
}

const sendNewFfpPassword = graphql`
  mutation SendNewFfpPassword($cardNumber: String!, $airlineCode: String!, $code: String!) {
    SendNewFfpPassword(cardNumber: $cardNumber, airlineCode: $airlineCode, code: $code)
  }
`;

export async function SendNewFfpPassword(
  parameters: SendNewFfpPasswordParameters
): Promise<MutateResult<SendNewFfpPasswordResult>> {
  return await sendNewFfpPassword.mutation(parameters);
}
