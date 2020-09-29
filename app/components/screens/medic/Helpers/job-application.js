import * as React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {capitalizeWord} from '../../../global/helpers';
import * as RootNavigation from '../../../navigation/root-navigation';
import JobApplicationReview from './job-application-review';
import {getJobApplication} from '../../../../services/medic/job-applications';
import styles from '../../../../assets/styles/medic/jobStyles'

function JobApplication({jobApplication}) {
	/*
	Seeding props in to state is a bit of an anti-pattern but I am doing it here as the parent never modifies the jobApplication
	once they are initially seeded in to here.
	And I couldn't think of any other way to handle onModalClose() below.
	- https://github.com/vasanthk/react-bits/blob/master/anti-patterns/01.props-in-initial-state.md
	*/
	const [jobApplicationState, setJobApplicationState] = React.useState(jobApplication);

	const [jobApplicationReviewModalVisible, setJobApplicationReviewModalVisible] = React.useState(false);

	const onModalClose = (success, response) => {
		if (success === true) {
		    setJobApplication(response);
		}

	    // Close the modal
	    setJobApplicationReviewModalVisible(false);
	}

	const deleteJobApplication = () => {
    	deleteJobApplication(jobApplicationState.id)
		.then(( response ) => {
	    	RootNavigation.navigate('Job Applications');
	    })
		.catch(( error ) => {});
	}

	const confirmJobApplication = () => {
    	confirmJobApplication(jobApplicationState.id)
		.then(( response ) => {
	    	setJobApplication(response);
	    })
		.catch(( error ) => {});
	}

	const {status, created_at, medic_role, job, client_email, client_mobile, description} = jobApplication
	const {name} = medic_role
	const {title, start_date_human_readable, end_date_human_readable, number_of_days, total_number_of_hours } = job

	//  StyleSheet close to return for readability
	const {imageStyle, wrapper, titleTxt, txt, tapStyle, rowWrapper, darkRowWrapper,
		darkColWrapper, mainWrapper, appRowWrapper} = styles

	return (
		<TouchableOpacity
			onPress={() => RootNavigation.navigate('Job Application', {job_application_id: jobApplication.id}) }
		>
			<View style={wrapper}>
				<Text style={titleTxt}>{ title }</Text>
				<View style={rowWrapper}>
					<Text style={titleTxt}>{ name }</Text>
				</View>
				<View style={rowWrapper}>
					<Text style={txt}>{ start_date_human_readable } - </Text>
					<Text style={txt}>{end_date_human_readable}</Text>
				</View>
				<Text style={txt}>{ description }</Text>
				<View style={darkRowWrapper}>
					<Text style={txt}>Days:  { number_of_days }      </Text>
					<Text style={txt}>Hours:  { total_number_of_hours }</Text>
				</View>
				<View style={darkColWrapper}>
					<Text style={titleTxt}>CLIENT</Text>
					<Text style={txt}>Email: { client_email }</Text>
					<Text style={txt}>Contact: { client_mobile }</Text>
				</View>
				<View style={appRowWrapper}>
					{ (jobApplicationState.status == 'approved' )  &&
						<Button title="Confirm" onPress={() => confirmJobApplication()} />
					}

					{ (jobApplicationState.status == 'applied' || jobApplicationState.status == 'approved' || jobApplicationState.status == 'confirmed' ) &&
						<Button title="Delete" onPress={() => deleteJobApplication()} />
					}

					{ (jobApplicationState.status == 'completed' ) &&
						<>
							<Button title="Review" onPress={() => setJobApplicationReviewModalVisible(true)} />

							<Modal isVisible={jobApplicationReviewModalVisible} backdropColor={'#333333'}>
								<JobApplicationReview jobApplication={jobApplicationState} callbackOnClose={onModalClose} />
							</Modal>
						</>
					}
				</View>
			</View>

		</TouchableOpacity>
	);
}

export default JobApplication;
