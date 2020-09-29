import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import apiCall, {setClientToken} from '../api/api';

export const signIn = async ( email, password ) => {
	const onSuccess = async response => {
		let userToken = response.data.token;
	 	let userType = response.data.user_type;

		if(userType !== 'medic' && userType !== 'client') {
			Alert.alert( 'Invalid User Type.' );
			throw new Error( 'Invalid User Type.' );
		} else {
	    	setClientToken(userToken);

		    try {
		      await AsyncStorage.setItem('userToken', userToken);
		      await AsyncStorage.setItem('userType', userType);
		    } catch (error) {
		      //
		    }

	    	return response.data;
		}
	};

	const onFailure = error => {
		throw error;
	};

    return apiCall('post', 'auth/login?createToken', {
        email: email,
        password: password
    })
    .then(onSuccess)
    .catch(onFailure);
}

export const signOut = async () => {
	const onSuccess = async response => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userType');
        } catch (error) {
            //
        }
    };

    const onFailure = error => {
		throw error;
	};

    return apiCall('post', 'auth/logout?hasToken', {})
    	.then(onSuccess)
    	.catch(onFailure);
}

export const forgotPassword = async (email) => {
	return apiCall('post', 'auth/forgot-password', {
    	email: email
    })
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}