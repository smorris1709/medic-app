import apiCall from '../api/api';

export const getSettingValue = async (setting_name) => {
	return apiCall('get', 'misc/settings/'+setting_name, {})
	.then(( response ) => {
        return response.data.value;
    })
    .catch(( error ) => {
    	throw error;
    });
}