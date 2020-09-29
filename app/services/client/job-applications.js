import apiCall from '../api/api';

export const getJobApplications = async (params) => {
	return apiCall('get', 'client/job-applications'+params, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getJobApplication = async (job_application_id) => {
	return apiCall('get', 'client/job-applications/'+job_application_id, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const approveJobApplication = async (job_application_id) => {
	return apiCall('post', 'client/job-applications/approve/'+job_application_id, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const rejectJobApplication = async (job_application_id) => {
	return apiCall('post', 'client/job-applications/reject/'+job_application_id, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const completedJobApplication = async (job_application_id, client_review, client_review_details) => {
	return apiCall('post', 'client/job-applications/completed/'+job_application_id, {
        client_review: client_review,
        client_review_details: client_review_details
    })
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const noShowJobApplication = async (job_application_id, user_no_show_details) => {
	return apiCall('post', 'client/job-applications/no-show/'+job_application_id, {
        user_no_show_details: user_no_show_details
    })
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}