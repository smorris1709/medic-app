import * as React from 'react';
import { Text, View } from 'react-native';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'

function SupportScreen() {
	return (
		<View style={screenStyles.wrapper}>
			<ScreenHeader
		        height={null}
		        bottomBorder={true}
		        backgroundImage={null}
		        title={"Support"}
		        subtitle={null}
		        rightContent={null}
		    />

			<View style={screenStyles.main}>
				{/* TODO display email address and phone number as clickable links */}
			</View>
		</View>
	);
}

export default SupportScreen;