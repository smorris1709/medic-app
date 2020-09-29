import apiCall from '../api/api';

export const getRegions = async () => {
	return apiCall('get', 'misc/regions', {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getMedicRoles = async () => {
	return apiCall('get', 'misc/medic-roles', {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}