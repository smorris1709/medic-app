import * as React from 'react';
import { Text, View } from 'react-native';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'

function TermsAndConditionsScreen() {
	return (
		<View style={screenStyles.wrapper}>
			<ScreenHeader
		        height={null}
		        bottomBorder={true}
		        backgroundImage={null}
		        title={"T&Cs"}
		        subtitle={null}
		        rightContent={null}
		    />

			<View style={screenStyles.main}>
			</View>
		</View>
	);
}

export default TermsAndConditionsScreen;