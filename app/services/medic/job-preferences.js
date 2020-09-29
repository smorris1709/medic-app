import apiCall from '../api/api';

export const getJobPreference = async () => {
	return apiCall('get', 'medic/job-preferences', {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const updateJobPreference = async (data) => {
	return apiCall('patch', 'medic/job-preferences', data)
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}