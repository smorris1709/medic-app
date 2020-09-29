import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {getJob} from '../../../services/medic/jobs';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import * as Icons from '../../../assets/icons';
import {markJobAsInterested, markJobAsNotInterested} from '../../../services/medic/jobs';
import {storeJobApplication} from '../../../services/medic/job-applications';
function JobShowScreen({ route, navigation }) {

	const {job_id} = route.params;
	const [job, setJob] = React.useState({});

	useFocusEffect(
	    React.useCallback(() => {
	   		getJob(job_id)
			.then(( response ) => {
		    	setJob(response);
		    })
		    .catch(( error ) => {});
	    }, [])
	);

	const markJobAsInterested = () => {
    	markJobAsInterested(job.id, job.medic_role_id)
		.then(( response ) => {
	    	// Refresh the job
	    	getJob(job_id)
			.then(( response ) => {
		    	setJob(response);
		    })
		    .catch(( error ) => {});
	    })
		.catch(( error ) => {});
	}

	const markJobAsNotInterested = () => {
    	markJobAsNotInterested(job.id, job.medic_role_id)
		.then(( response ) => {
	    	// Refresh the job
	    	getJob(job_id)
			.then(( response ) => {
		    	setJob(response);
		    })
		    .catch(( error ) => {});
	    })
		.catch(( error ) => {});
	}

	const storeJobApplication = () => {
    	storeJobApplication(job.id, job.medic_role_id)
		.then(( response ) => {
	    	// Refresh the job
	    	getJob(job_id)
			.then(( response ) => {
		    	setJob(response);
		    })
		    .catch(( error ) => {});
	    })
		.catch(( error ) => {});
	}

	return (
		<View style={screenStyles.wrapper}>
			<ScreenHeader
		        height={null}
		        bottomBorder={true}
		        backgroundImage={null}
		        title={"Job Profile"}
		        subtitle={null}
		        rightContent={
		        	<Image source={Icons.magGlass} style={{width: 35, height: 35}} />
		        }
		    />

	      	<View style={screenStyles.main}>
				<Text>{job.title}</Text>

				{/* TODO Show all details of the job (including regions, medicsRoles and dates).  */}

				{/*
				TODO
				if (job.medic_expressed_interest == false && job.medic_dismissed === false)
					Up button for markJobAsInterested()
					Down button for markJobAsNotInterested()
				*/}

				{/* TODO if job.application_made != true; button to storeJobApplication() */}
			</View>
		</View>
	);
}

export default JobShowScreen;