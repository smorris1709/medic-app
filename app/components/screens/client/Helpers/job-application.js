import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import {capitalizeWord} from '../../../global/helpers';
import * as RootNavigation from '../../../navigation/root-navigation';
import JobApplicationCompleted from './job-application-completed';
import JobApplicationNoShow from './job-application-no-show';
import {getJobApplication} from '../../../../services/client/job-applications';
import styles from '../../../../assets/styles/client/jobStyles';
import * as icons from '../../../../assets/icons';

const {goldStar, leftSwipeArrow, rightSwipeArrow} = icons

function JobApplication({jobApplication}) {
	/*
	Seeding props in to state is a bit of an anti-pattern but I am doing it here
	as the parent never modifies the jobApplication once they are initially seeded
	in to here.  And I couldn't think of any other wya to handle onModalClose() below.
	- https://github.com/vasanthk/react-bits/blob/master/anti-patterns/01.props-in-initial-state.md
	*/
	const [jobApplicationState, setJobApplicationState] = React.useState(jobApplication);
	const [jobApplicationCompletedModalVisible, setJobApplicationCompletedModalVisible] = React.useState(false);
	const [jobApplicationNoShowModalVisible, setJobApplicationNoShowModalVisible] = React.useState(false);

	const onModalClose = (success, response) => {
		if (success == true, response) {
		    setJobApplicationState(response);
		}

	    // Close the modal
	    setJobApplicationCompletedModalVisible(false);
	    setJobApplicationNoShowModalVisible(false);
	}

	const approveJobApplication = () => {
    	approveJobApplication(jobApplicationState.id)
		.then(( response ) => {
		    setJobApplicationState(response);
	    })
		.catch(( error ) => {});
	}

	const rejectJobApplication = () => {
    	rejectJobApplication(jobApplicationState.id)
		.then(( response ) => {
	    	setJobApplicationState(response);
	    })
		.catch(( error ) => {});
	}

	const {imageStyle, wrapper, titleTxt, titleTxt2, txt, tapStyle, rowWrapper, darkRowWrapper,
		darkColWrapper, mainWrapper, appRowWrapper} = styles

	return (
		<TouchableOpacity
			onPress={() => RootNavigation.navigate('Job Application', {job_application_id: jobApplicationState.id}) }
		>
			<View style={wrapper}>

				<Text style={titleTxt}>{ jobApplicationState.job.title }</Text>
				<View style={darkColWrapper}>
					<View style={rowWrapper}>
						<Text style={txt}>Name : { jobApplicationState.medic.name }</Text>
						{ jobApplicationState.medic.user_rating !== null &&
							<>
								<Text style={txt}>{ jobApplicationState.medic.user_rating }</Text>
								<Image source={goldStar} style={imageStyle}/>
							</>
						}
					</View>
					<Text style={txt}>Role: { jobApplicationState.medic_role.name }</Text>
					<Text style={txt}>Email: { jobApplicationState.medic_email }</Text>
					<Text style={txt}>Contact: { jobApplicationState.medic_mobile }</Text>
					<Text style={txt}>Application Status: { capitalizeWord(jobApplicationState.status) }</Text>
				</View>

				{ (jobApplicationState.status == 'applied' || jobApplicationState.status == 'rejected'
					|| jobApplicationState.status == 'approved' || jobApplicationState.status == 'confirmed') &&

					<View style={appRowWrapper}>
						{ (jobApplicationState.status == 'applied' || jobApplicationState.status == 'rejected') &&
							<TouchableOpacity
			                    style={styles.button}
			                    onPress={() => approveJobApplication() }>
			                    <Text style={styles.buttonText}>Approve</Text>
			                </TouchableOpacity>
						}

						{ (jobApplicationState.status == 'applied' || jobApplicationState.status == 'approved' || jobApplicationState.status == 'confirmed') &&
							<TouchableOpacity
			                    style={styles.button}
			                    onPress={() => rejectJobApplication() }>
			                    <Text style={styles.buttonText}>Reject</Text>
			                </TouchableOpacity>
						}

						{ (jobApplicationState.status == 'confirmed') &&
							<>
								<TouchableOpacity
				                    style={styles.button}
				                    onPress={() => setJobApplicationCompletedModalVisible(true) }>
				                    <Text style={styles.buttonText}>Completed</Text>
				                </TouchableOpacity>

				                <TouchableOpacity
				                    style={styles.button}
				                    onPress={() => setJobApplicationNoShowModalVisible(true) }>
				                    <Text style={styles.buttonText}>No Show</Text>
				                </TouchableOpacity>

								<Modal isVisible={jobApplicationCompletedModalVisible} backdropColor={'#333333'}>
									<JobApplicationCompleted jobApplication={jobApplicationState} callbackOnClose={onModalClose} />
								</Modal>

								<Modal isVisible={jobApplicationNoShowModalVisible} backdropColor={'#333333'}>
									<JobApplicationNoShow jobApplication={jobApplicationState} callbackOnClose={onModalClose} />
								</Modal>
							</>
						}
					</View>
				}
			</View>
		</TouchableOpacity>
	);
}

export default JobApplication;
