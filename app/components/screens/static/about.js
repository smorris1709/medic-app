import * as React from 'react';
import { Text, View } from 'react-native';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'

function AboutScreen() {
	return (
		<View style={screenStyles.wrapper}>
			<ScreenHeader
		        height={null}
		        bottomBorder={true}
		        backgroundImage={null}
		        title={"About"}
		        subtitle={null}
		        rightContent={null}
		    />

			<View style={screenStyles.main}>
			</View>
		</View>
	);
}

export default AboutScreen;
