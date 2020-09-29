import * as React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import JobApplicationReview from './Helpers/job-application-review';
import {getJobApplication} from '../../../services/medic/job-applications';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import * as Icons from '../../../assets/icons';

function JobApplicationShowScreen({ route, navigation }) {

	const {job_application_id} = route.params;
	const [isLoading, setIsLoading] = React.useState(true);
	const [jobApplication, setJobApplication] = React.useState({});
	const [jobApplicationReviewModalVisible, setJobApplicationReviewModalVisible] = React.useState(false);

	useFocusEffect(
	    React.useCallback(() => {
	   		getJobApplication(job_application_id)
			.then(( response ) => {
		    	setJobApplication(response);
		    	setIsLoading(false);
		    })
		    .catch(( error ) => {});
	    }, [])
	);

	const onModalClose = (success, response) => {
		if (success === true) {
		    setJobApplication(response);
		}

	    // Close the modal
	    setJobApplicationReviewModalVisible(false);
	}

	const deleteJobApplication = () => {
    	deleteJobApplication(job_application_id)
		.then(( response ) => {
	    	navigation.navigate('Job Applications');
	    })
		.catch(( error ) => {});
	}

	const confirmJobApplication = () => {
    	confirmJobApplication(job_application_id)
		.then(( response ) => {
	    	setJobApplication(response);
	    })
		.catch(( error ) => {});
	}

	return (
		<View style={screenStyles.wrapper}>
	      	<ScreenHeader
		        height={null}
		        bottomBorder={true}
		        backgroundImage={null}
		        title={"Job Application"}
		        subtitle={null}
		        rightContent={
		        	<Image source={Icons.appliedIcon} style={{width: 35, height: 35}} />
		        }
		    />

		    {isLoading === true &&
		    	<>
		    		{/* TODO */}
		    	</>
		    }

		    {isLoading === false &&
		     	<View style={screenStyles.main}>
					<Text>{jobApplication.job.title}</Text>

					{ (jobApplication.status == 'approved' )  &&
						<Button title="Mark As Confirmed" onPress={() => confirmJobApplication()} />
					}

					{ (jobApplication.status == 'applied' || jobApplication.status == 'approved' || jobApplication.status == 'confirmed' ) &&
						<Button title="Delete" onPress={() => deleteJobApplication()} />
					}

					{ (jobApplication.status == 'completed' ) &&
						<>
							<Button title="Post A Review" onPress={() => setJobApplicationReviewModalVisible(true)} />

							<Modal isVisible={jobApplicationReviewModalVisible} backdropColor={'#333333'}>
								<JobApplicationReview jobApplication={jobApplication} callbackOnClose={onModalClose} />
							</Modal>
						</>
					}
				</View>
			}
		</View>
	);
}

export default JobApplicationShowScreen;