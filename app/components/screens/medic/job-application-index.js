import * as React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import JobApplication from './Helpers/job-application.js';
import {getJobApplications} from '../../../services/medic/job-applications';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import * as Icons from '../../../assets/icons';

function JobApplicationIndexScreen() {

	const [jobApplications, setJobApplications] = React.useState([]);

	useFocusEffect(
	    React.useCallback(() => {
	   		getJobApplications('')
			.then(( response ) => {
		    	setJobApplications(response);
		    })
		    .catch(( error ) => {});
	    }, [])
	);

	return (
    	<View style={screenStyles.wrapper}>
			<ScreenHeader
		        height={null}
		        bottomBorder={true}
		        backgroundImage={null}
		        title={"Job Applications"}
		        subtitle={null}
		        rightContent={
		        	<Image source={Icons.appliedIcon} style={{width: 35, height: 35}} />
		        }
		    />

			<View style={screenStyles.main}>
				<FlatList
					data={jobApplications}
					keyExtractor = { (item, index) => index.toString() }
					renderItem={({ item }) => (
						<JobApplication jobApplication={item} />
					)}
				/>
			</View>
		</View>
	);
}

export default JobApplicationIndexScreen;
