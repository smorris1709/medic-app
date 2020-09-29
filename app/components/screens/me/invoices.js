import * as React from 'react';
import { Platform, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob'
import {config} from '../../../../config';
import {AuthContext} from '../../context/auth-context-provider';
import {getInvoices, getInvoice} from '../../../services/me/billing';
import styles from '../../../assets/styles/me/invoicesStyles'
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'

function InvoicesScreen() {

	const {userToken} = React.useContext(AuthContext);

	const [invoices, setInvoices] = React.useState([]);
	const [pdfSource, setPdfSource] = React.useState(null);

	useFocusEffect(
	    React.useCallback(() => {
	   		getInvoices({
	   			'include-pending': true
	   		})
			.then(( response ) => {
		    	setInvoices(response);
		    })
		    .catch(( error ) => {});
	    }, [])
	);

	const viewInvoice = (invoice_id) => {

		// TODO see if can change the file name that shows for the below on open

        RNFetchBlob
		  .config({
		    fileCache : true,
		    appendExt : 'pdf'
		  })
	      .fetch('GET', config.apiBaseUrl+'me/billing/invoices/'+invoice_id, {
		    Authorization : 'Bearer ' + userToken,
		  })
		  .then((res) => {
		  	if (Platform.OS === "ios") {
		    	RNFetchBlob.ios.openDocument(res.path());
		    } else {
		    	RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf')
		    }
		  })
    }

	return (
		<View style={screenStyles.wrapper}>
	      	<ScreenHeader
                height={null}
                bottomBorder={true}
                backgroundImage={null}
                title={"Invoices"}
                rightContent={null}
            />

    		<View style={screenStyles.main}>

				{/* TODO document icon next to every alert */}

				<FlatList
					data={invoices}
					style={{marginTop:10}}
					keyExtractor = { (item, index) => index.toString() }
					renderItem={({ item }) => (
						<TouchableOpacity
				        onPress={() => viewInvoice(item.id)}
					      style={styles.invoice}>
				      <Text style={styles.invoice_text}>
								{item.date_human_readable} (Status : {item.status})
							</Text>
				    </TouchableOpacity>
					)} />
			</View>
		</View>
	);
}

export default InvoicesScreen;
