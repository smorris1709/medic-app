import * as React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import JobApplicationCompleted from './Helpers/job-application-completed';
import JobApplicationNoShow from './Helpers/job-application-no-show';
import {getJobApplication} from '../../../services/client/job-applications';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import * as Icons from '../../../assets/icons';

function JobApplicationShowScreen({ route, navigation }) {

	const {job_application_id} = route.params;
	const [isLoading, setIsLoading] = React.useState(true);
	const [jobApplication, setJobApplication] = React.useState({});
	const [jobApplicationCompletedModalVisible, setJobApplicationCompletedModalVisible] = React.useState(false);
	const [jobApplicationNoShowModalVisible, setJobApplicationNoShowModalVisible] = React.useState(false);

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
	    setJobApplicationCompletedModalVisible(false);
	    setJobApplicationNoShowModalVisible(false);
	}

	const approveJobApplication = () => {
    	approveJobApplication(job_application_id)
		.then(( response ) => {
	    	setJobApplication(response);
	    })
		.catch(( error ) => {});
	}

	const rejectJobApplication = () => {
    	rejectJobApplication(job_application_id)
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

					{/* TODO Display everything on jobApplication.medic (including button to misc.file.view for each file - display them in a new browser window). */}

					{ (jobApplication.status == 'applied' || jobApplication.status == 'rejected') &&
						<Button title="Mark As Approved" onPress={() => approveJobApplication()} />
					}

					{ (jobApplication.status == 'applied' || jobApplication.status == 'approved' || jobApplication.status == 'confirmed') &&
						<Button title="Mark As Rejected" onPress={() => rejectJobApplication()} />
					}

					{ (jobApplication.status == 'confirmed') &&
						<>
							<Button title="Mark As Completed" onPress={() => setJobApplicationCompletedModalVisible(true)} />
							<Button title="Mark As A No Show" onPress={() => setJobApplicationNoShowModalVisible(true)} />

							<Modal isVisible={jobApplicationCompletedModalVisible} backdropColor={'#333333'}>
								<JobApplicationCompleted jobApplication={jobApplication} callbackOnClose={onModalClose} />
							</Modal>

							<Modal isVisible={jobApplicationNoShowModalVisible} backdropColor={'#333333'}>
								<JobApplicationNoShow jobApplication={jobApplication} callbackOnClose={onModalClose} />
							</Modal>
						</>
					}
				</View>
			}
		</View>
	);
}

export default JobApplicationShowScreen;
