import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Layout from '../layout/layout';
import SplashScreen from '../screens/splash';
import { reducer } from './reducer';
import apiCall, {setClientToken} from '../../services/api/api';
import * as Auth from '../../services/auth/auth';

export const AuthContext = React.createContext();

function AuthContextProvider() {

  // Set up state
  const [state, dispatch] = React.useReducer(reducer, {
      isLoading: true,
      isSignout: false,
      authorised: false,
      userToken: null,
      userType: null,
    }
  );

  // Fetch the token from storage
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      let userType = null;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        userType = await AsyncStorage.getItem('userType');
      } catch (e) {
        //
      }

      if (userToken !== null && userType !== null) {
        setClientToken(userToken);

        dispatch({
          type: 'RESTORE_TOKEN',
          authorised: true,
          userToken: userToken,
          userType: userType,
        });
      } else {
        dispatch({
          type: 'RESTORE_TOKEN',
          authorised: false,
          userToken: null,
          userType: null,
        });
      }
    };

    bootstrapAsync();
  }, []);

  // Functions that can be called from other parts of the app
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        Auth.signIn(data.email, data.password)
          .then(( response ) => {
              dispatch({
                type: 'SIGN_IN',
                authorised: true,
                userToken: response.token,
                userType: response.user_type,
              });
          })
          .catch(( error ) => {});
      },
      signOut: async data => {
        Auth.signOut()
          .then(() => {
            dispatch({
              type: 'SIGN_OUT'
            });
          })
          .catch(error => {});
      }
    }),
    [],

  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={{authContext, userType: state.userType, userToken: state.userToken}}>
      <Layout authorised={state.authorised} userType={state.userType} />
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
