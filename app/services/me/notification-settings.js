import apiCall from '../api/api';

export const getNotificationSettings = async () => {
	return apiCall('get', 'me/notification-settings', {})
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const updateNotificationSetting = async (notification_setting_id, active) => {
	return apiCall('patch', 'me/notification-settings/'+notification_setting_id, {
        active: active
    })
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const unsubscribeAllNotificationSettings = async (channel) => {
	return apiCall('patch', 'me/notification-settings/unsubscribe-all', {
        channel: channel
    })
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}