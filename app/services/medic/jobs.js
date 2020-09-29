import apiCall from '../api/api';

export const getJobs = async (params) => {
	return apiCall('get', 'medic/jobs'+params, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getInterestedJobs = async (params) => {
	return apiCall('get', 'medic/jobs/interested'+params, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getRecentlyViewedJobs = async (params) => {
	return apiCall('get', 'medic/jobs/recently-viewed'+params, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getJob = async (job_id, medic_role_id) => {
	return apiCall('get', 'medic/jobs', {
		job_id: job_id,
		medic_role_id: medic_role_id
	})
	.then(( response ) => {
        return response.data[0];
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const markJobAsInterested = async (job_id, medic_role_id) => {
	return apiCall('post', 'medic/jobs/mark-as-interested', {
		job_id: job_id,
		medic_role_id: medic_role_id
	})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const markJobAsNotInterested = async (job_id, medic_role_id) => {
	return apiCall('post', 'medic/jobs/mark-as-not-interested', {
		job_id: job_id,
		medic_role_id: medic_role_id
	})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}