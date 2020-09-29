import apiCall from '../api/api';

export const getJobs = async (params) => {
	return apiCall('get', 'client/jobs'+params, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const storeJob = async (data) => {
	return apiCall('post', 'client/jobs', data)
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getJob = async (job_id) => {
	return apiCall('get', 'client/jobs/'+job_id, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const updateJob = async (job_id, data) => {
	return apiCall('patch', 'client/jobs/'+job_id, data)
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const deleteJob = async (job_id) => {
	return apiCall('delete', 'client/jobs/'+job_id, {})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const updateJobAllowNewApplications = async (job_id, allow_new_applications) => {
    return apiCall('patch', 'client/jobs/'+job_id+'/update-allow-new-applications', {
        allow_new_applications: allow_new_applications
    })
    .then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
        throw error;
    });
}

export const getJobPossibleMatches = async (job_id, params) => {
    return apiCall('get', 'client/jobs/'+job_id+'/possible-matches'+params, {})
    .then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
        throw error;
    });
}

export const getClientInterests = async (job_id) => {
	return apiCall('get', 'client/job-client-interests/'+job_id, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const storeClientInterest = async (job_id, data) => {
	return apiCall('post', 'client/job-client-interests/'+job_id, data)
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const postFlashMessage = async (job_id, data) => {
	return apiCall('post', 'client/flash-messages/'+job_id, data)
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}