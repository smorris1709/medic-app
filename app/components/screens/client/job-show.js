import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {getJob, getJobPossibleMatches} from '../../../services/client/jobs';
import {getJobApplications} from '../../../services/client/job-applications';
import formStyles from '../../../assets/styles/form-styles'
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import * as Icons from '../../../assets/icons';

function JobShowScreen({ route, navigation }) {

	const {job_id} = route.params;

	const [job, setJob] = React.useState({});
	const [jobApplications, setJobApplications] = React.useState({});
	const [possibleMatches, setPossibleMatches] = React.useState({});

	useFocusEffect(
	    React.useCallback(() => {
	   		getJob(job_id)
			.then(( response ) => {
		    	setJob(response);
		    })
		    .catch(( error ) => {});

		    getJobApplications('?job_id='+job_id)
			.then(( response ) => {
		    	setJobApplications(response);
		    })
		    .catch(( error ) => {});

		    getJobPossibleMatches(job_id, '')
			.then(( response ) => {
		    	setPossibleMatches(response);
		    })
		    .catch(( error ) => {});
	    }, [])
	);

	const deleteJob = () => {
    	deleteJob(job_id)
		.then(( response ) => {
	    	navigation.navigate('Jobs');
	    })
		.catch(( error ) => {});
	}

	const updateJobAllowNewApplications = () => {

		if(job.allow_new_applications === false) {
			let allow_new_applications = true;
		} else {
			let allow_new_applications = false;
		}

    	updateJobAllowNewApplications(job_id, allow_new_applications)
		.then(( response ) => {
	    	setJob(response);
	    })
		.catch(( error ) => {});
	}

	const storeClientInterest = (user_id, medic_role_id, client_expressed_interest) => {

		let data = {
			user_id: user_id,
			medic_role_id: medic_role_id,
			client_expressed_interest: client_expressed_interest
		};

    	storeClientInterest(job_id, data)
		.then(( response ) => {
	    	// Refresh the list
	    	getJobPossibleMatches(job_id, '')
			.then(( response ) => {
		    	setPossibleMatches(response);
		    })
		    .catch(( error ) => {});
	    })
		.catch(( error ) => {});
	}

	const postFlashMessage = () => {
    	postFlashMessage(job_id, data)
		.then(( response ) => {
			// TODO
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
                rightContent={
                	<Image source={Icons.magGlass} style={{width: 35, height: 35}} />
                }
            />

	      	<View style={screenStyles.main}>
				<Text>{job.title}</Text>

				<TouchableOpacity
	              style={formStyles.button}
	              onPress={() => navigation.navigate('Post A Job', {job_id: job.id})}>
	              <Text style={formStyles.buttonText}>Edit</Text>
	            </TouchableOpacity>

				{/* TODO Show all details of the job (including regions, medicsRoles and dates) */}

				{/* TODO A button to send a flash message - postFlashMessage(). */}

				{/* TODO A button to update the job - navigation.navigate('Post A Job', {job_id: job.id}). */}

				{/* TODO A button to toggle updateJobAllowNewApplications() */}

				{/* TODO Show all jobApplications */}

				{/* TODO Show all possibleMatches
					- next to each if client_expressed_interest != true then show a thumbs up button that onPress hits storeClientInterest(user_id, medic_role_id, true)
				 */}

				{/* TODO delete job button - onpress = confirmation then deleteJob() */}
			</View>
		</View>
	);
}

export default JobShowScreen;
