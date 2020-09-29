export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        isLoading: false,
        isSignout: false,
        authorised: action.authorised,
        userToken: action.userToken,
        userType: action.userType,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isLoading: false,
        isSignout: false,
        authorised: action.authorised,
        userToken: action.userToken,
        userType: action.userType,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isLoading: false,
        isSignout: true,
        authorised: false,
        userToken: null,
        userType: null
      };
  }
};
