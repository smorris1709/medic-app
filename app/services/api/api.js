import axios from 'axios';
import { Alert } from 'react-native';
import {config} from '../../../config';

// Create axios client, pre-configured with baseURL
let API = axios.create({
 	baseURL: config.apiBaseUrl,
 	timeout: 10000,
});

console.log('here is the url:  ', config.apiBaseUrl)

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
 	API.defaults.headers["Authorization"] = `Bearer ${token}`;
};

const onSuccess = response => {
	return response.data;
};

const onFailure = error => {

	// TODO below only if exist as causing errors.
	let status = error.response.status;
	let message = error.response.data.message;
	let errors = error.response.data.errors;

	/*
	if (message && message == 'You are not logged in.') {
		TODO call AuthContext.signOut (test to make sure this works by deleting a token from the db)
	}
	*/

	if (message) {
		Alert.alert( message );
	} else {
		Alert.alert( 'Whoops, there has been an error. Please try again. If the problem persists please contact support.' );
	}

	throw error;
};

const apiCall = async (type, url, data) => {
	if(type == 'get') {
		return API.get(url, data)
	        .then(onSuccess)
	        .catch(onFailure);
	}

	if(type == 'post') {
		return API.post(url, data)
	        .then(onSuccess)
	        .catch(onFailure);
	}

	if(type == 'put') {
		return API.put(url, data)
	        .then(onSuccess)
	        .catch(onFailure);
	}

	if(type == 'patch') {
		return API.patch(url, data)
	        .then(onSuccess)
	        .catch(onFailure);
	}

	if(type == 'delete') {
		return API.delete(url, data)
	        .then(onSuccess)
	        .catch(onFailure);
	}
};

export default apiCall;
