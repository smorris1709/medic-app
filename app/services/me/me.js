import apiCall from '../api/api';

export const getMe = async () => {
	return apiCall('get', 'me', {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const updateMe = async (data) => {
	return apiCall('patch', 'me', data)
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const deleteMe = async (confirmed) => {
	return apiCall('delete', 'me', {
        confirmed: confirmed
    })
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const updatePassword = async (data) => {
	return apiCall('post', 'me/update-password', data)
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}