import apiCall from '../api/api';

export const getLatestNotification = async () => {
	return apiCall('get', 'me/notifications?per_page=1', {})
	.then(( response ) => {
        return response.data[0];
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getNotifications = async (params) => {
	return apiCall('get', 'me/notifications'+params, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getNotification = async (notification_id) => {
	return apiCall('get', 'me/notifications/'+notification_id, {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const markNotificationsAsRead = async (notification_ids) => {
	return apiCall('post', 'me/notifications/mark-as-read', {
		ids: notification_ids
	})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const markNotificationsAsUnread = async (notification_ids) => {
	return apiCall('post', 'me/notifications/mark-as-unread', {
		ids: notification_ids
	})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}