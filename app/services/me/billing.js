import apiCall from '../api/api';

export const getInvoices = async (data) => {
	return apiCall('get', 'me/billing/invoices', data)
	.then(( response ) => {
        return response.data;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getInvoice = async (invoice_id) => {
	return apiCall('get', 'me/billing/invoices/'+invoice_id, {})
	.then(( response ) => {
        return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}

export const getDbs = async () => {
	return apiCall('get', dbsFilePath, {})
	.then(( response ) => {
      return response;
    })
    .catch(( error ) => {
    	throw error;
    });
}
