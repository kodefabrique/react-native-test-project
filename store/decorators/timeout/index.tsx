import { RematchDispatch } from '@rematch/core';
import { IStoreState, IStateModelEffect, IStateModels } from 'types';
import { TIMEOUT_DELAY } from 'values';
import { flatObj } from 'utils';

export function decorateTimeout(models: IStateModels): IStateModels {
  const decoratedModels = Object.keys(models)
    .map((key) => ({ key, model: models[key] }))
    .filter(({ model }) => model.effects)
    .map(({ key, model }) => ({
      [key]: {
        ...model,
        effects: decorateTimeoutEffects(model.effects),
      },
    }))
    .reduce(flatObj, {});

  return {
    ...models,
    ...decoratedModels,
  };
}

function decorateTimeoutEffects(effects: IStateModelEffect) {
  const TIMEOUT_MESSAGE = 'TIMEOUT_MESSAGE';

  return function (dispatch: RematchDispatch) {
    const dispatchedEffects = effects(dispatch);

    return Object.keys(dispatchedEffects)
      .map((key) => ({
        [key]: async <T extends {}>(payload: T, rootState: IStoreState): Promise<void> => {
          let timeoutHendler: NodeJS.Timeout;

          const timeout = new Promise((_, rej) => {
            timeoutHendler = setTimeout(() => rej(new Error(TIMEOUT_MESSAGE)), TIMEOUT_DELAY);
          });

          async function target() {
            return await dispatchedEffects[key](payload, rootState);
          }

          await Promise.race([timeout, target()])
            .then(() => clearTimeout(timeoutHendler))
            .catch((err) => {
              if (err.message === TIMEOUT_MESSAGE) {
                dispatch.runtime.setIsTimeout(true);
              }
            });
        },
      }))
      .reduce(flatObj, {});
  };
}
