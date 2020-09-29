import * as React from 'react';
import { Switch, Text, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {getNotificationSettings,
	updateNotificationSetting,
	unsubscribeAllNotificationSettings} from '../../../services/me/notification-settings';
import * as Icons from '../../../assets/icons';
import TwoChildRow from './components/two-child-row'
import formStyles from '../../../assets/styles/form-styles'
import styles from '../../../assets/styles/me/notificationSettingsStyles'
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import * as Helpers from './Helpers/data'

const {wrapper, titleTxt, button, buttonText, switchStyle} = styles
const {bellNoBG} = Icons

function NotificationSettingsScreen(props) {

	const [notes, setNotes] = React.useState(Helpers.noticationSettingsData)

	useFocusEffect(
	    React.useCallback(() => {
	   		getNotificationSettings()
			.then(( response ) => {
		    	setNotificationSettings(response);
		    })
		    .catch(( error ) => {});
	    }, []
		)
	);

	const displayNotifications = (arr) => {
		return arr.map(ns => {
			return (
				<TouchableOpacity style={button}>
				 <Text style={styles.buttonText}>{ns.name} {ns.channel}</Text>
					 <Switch

							trackColor={{true: '#4d4d4d', }}
							thumbColor={true ? '#333333' : "#fff"}
							value={active}
							onValueChange={value =>
								setActive(
									active.map(note =>
										console.log(index, note.id)
										// note.id === index ? { ...active } : value)
								);
							}
	            style={switchStyle}
						/>
			 </TouchableOpacity>
			)
		})
	}

	const toggleNotificationSetting = (index) => {
		let active = ! notificationSettings[index]['active'];
		let notification_setting_id = notificationSettings[index]['id'];

	    let newNotificationSettings = [...notificationSettings];
        newNotificationSettings[index]['active'] = active;
        setNotificationSettings(newNotificationSettings);

	    updateNotificationSetting(notification_setting_id, active)
        .then(( response ) => {})
        .catch(( error ) => {});
	};

    const unsubscribeAllNotificationSettings = (channel) => {
        unsubscribeAllNotificationSettings(channel)
        .then(( response ) => {
            // TODO
        })
        .catch(( error ) => {});
    }
	return (
		<View style={wrapper}>
			<TwoChildRow
				rowTitle="Notification Settings"
				uIElement={bellNoBG}
			/>

			{/*
			TODO
			List all notificationSettings as a switch (use the same as the dark mode switch on the profile page)
			 with current notificationSettings selected.

			notificationSettings is an array of objects in this format;
			"id": 1,
			"notification": "end_of_day_wrap"
			"channel": "mail",
			"active": true,
			"locked_for_user": false,

			TODO if locked_for_user=true then switch should be locked
			 */}

	 			<TouchableOpacity
	        style={button}
	        onPress={() => unsubscribeAllNotificationSettings('mail')}>
	        <Text style={styles.buttonText}>Unsubscribe From All Email Notifications</Text>
	      </TouchableOpacity>

	      <TouchableOpacity
	        style={button}
	        onPress={() => unsubscribeAllNotificationSettings('sms')}>
	        <Text style={styles.buttonText}>Unsubscribe From All SMS Notifications</Text>
	      </TouchableOpacity>

	      <TouchableOpacity
	        style={button}
	        onPress={() => unsubscribeAllNotificationSettings()}>
	        <Text style={styles.buttonText}>Unsubscribe From All Notifications</Text>
	      </TouchableOpacity>

				{displayNotifications(notes)}
		</View>
	);
}

export default NotificationSettingsScreen;
