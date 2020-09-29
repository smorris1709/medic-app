import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {getNotifications,
	markNotificationsAsRead,
	markNotificationsAsUnread} from '../../../services/me/notifications';
import styles from '../../../assets/styles/me/alertsStyles'
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import * as Icons from '../../../assets/icons';

function AlertsScreen() {

	const [alerts, setAlerts] = React.useState([]);

	useFocusEffect(
	    React.useCallback(() => {
	   		getNotifications('')
			.then(( response ) => {
		    	setAlerts(response);
		    })
		    .catch(( error ) => {});
	    }, [])
	);

	const toggleNotificationRead = (index, notification) => {
		let notification_ids = [ notification.id ];

		if (notification.read_at === null) {
	        markNotificationsAsRead(notification_ids)
	        .then(( response ) => {
	        	updateAlertReadAt(index, 'not_null'); // Not the actual value but solves this.
	        })
	        .catch(( error ) => {});
	    } else {
	    	markNotificationsAsUnread(notification_ids)
	        .then(( response ) => {
	            updateAlertReadAt(index, null);
	        })
	        .catch(( error ) => {});
	    }
    }

    const updateAlertReadAt = (index, readAt) => {
    	let updatedAlerts = [...alerts];
	    let alert = {...updatedAlerts[index]};
	    alert.read_at = readAt;
	    updatedAlerts[index] = alert;
        setAlerts(updatedAlerts);
    }

	return (
		<View style={screenStyles.wrapper}>
	      	<ScreenHeader
                height={null}
                bottomBorder={true}
                backgroundImage={null}
                title={"Alerts"}
                rightContent={
                	<Image source={Icons.bellNoBG} style={{width: 35, height: 35}} />
                }
            />

    		<View style={screenStyles.main}>

				{/* TODO alert icon next to every alert */}

				<FlatList
					style={{marginTop:5}}
					data={alerts}
					keyExtractor = { (item, index) => index.toString() }
					renderItem={({ item, index }) => (
						<TouchableOpacity
				          onPress={() => toggleNotificationRead(index, item)}
				          style={ (item.read_at === null) ? styles.unread_alert : styles.read_alert}
				        >
							<Text style={styles.alert_text}>{item.message}</Text>
						</TouchableOpacity>
					)} />
			</View>
		</View>
	);
}

export default AlertsScreen;