import apiCall from '../api/api';

export const getFiles = async (params) => {
	return apiCall('get', 'misc/file'+params, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const uploadFile = async (file, type) => {
    // TODO is this set up properly?
	return apiCall('post', 'misc/file/upload', {
        file: file,
        type: type
    })
		.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const viewFile = async (file_path) => {
    // TODO is this set up properly?
	return apiCall('post', 'misc/file/view', {
		file_path: file_path
	})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const deleteFile = async (file_path) => {
	return apiCall('delete', 'misc/file/delete', {
		file_path: file_path
	})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}
