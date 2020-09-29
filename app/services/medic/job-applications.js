import apiCall from '../api/api';

export const getJobApplications = async (params) => {
	return apiCall('get', 'medic/job-applications'+params, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const storeJobApplication = async (job_id, medic_role_id) => {
	return apiCall('post', 'medic/job-applications', {
        job_id: job_id,
        medic_role_id: medic_role_id
    })
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getJobApplication = async (job_application_id) => {
	return apiCall('get', 'medic/job-applications/'+job_application_id, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const deleteJobApplication = async (job_application_id) => {
	return apiCall('delete', 'medic/job-applications/'+job_application_id, {})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const confirmJobApplication = async (job_application_id) => {
	return apiCall('post', 'medic/job-applications/'+job_application_id+'/confirm', {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const reviewJobApplication = async (job_application_id, medic_review, medic_review_details) => {
	return apiCall('post', 'medic/job-applications/'+job_application_id+'/review', {
        medic_review: medic_review,
        medic_review_details: medic_review_details
    })
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}