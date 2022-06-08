export function languageReset(state: any) {
  return {
    app: state.app,
    account: state.account,
    authenticate: state.authenticate,
    profile: state.profile,
    currentUser: state.currentUser,
    tokens: state.tokens,
    _persist: state?._persist,
  };
}
