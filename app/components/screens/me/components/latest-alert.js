import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {getLatestNotification} from '../../../../services/me/notifications';
import * as RootNavigation from '../../../navigation/root-navigation';
import latestAlertStyles from '../../../../assets/styles/me/latestAlertStyles'

function LatestAlert(props) {

	const [latestAlert, setLatestAlert] = React.useState([]);

	useFocusEffect(
	    React.useCallback(() => {
	   		getLatestNotification()
	        .then(response => {
	          setLatestAlert(response);
	        })
	        .catch(error => {});
	    }, [])
	);

	return (
		<>
			{latestAlert &&
				<View style={{ marginBottom: props.marginBottom }}>
					<TouchableOpacity onPress={() => RootNavigation.navigate('Alerts')}>
						<Text style={latestAlertStyles.latestAlertStyle}>
							You have a new alert!
						</Text>
					</TouchableOpacity>
				</View>
			}
		</>
	);
}

export default LatestAlert;