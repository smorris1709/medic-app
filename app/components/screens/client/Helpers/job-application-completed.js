import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import modalStyles from '../../../../assets/styles/modal-styles'
import formStyles from '../../../../assets/styles/form-styles'
import {completedJobApplication} from '../../../../services/client/job-applications';

function JobApplicationCompleted({jobApplication, callbackOnClose}) {

	const [clientReview, setclientReview] = React.useState(null);
	const [clientReviewDetails, setclientReviewDetails] = React.useState(null);

	const submit = () => {
	    completedJobApplication(jobApplication.id, clientReview, clientReviewDetails)
		.then(( response ) => {
	    	callbackOnClose(true, response);
	    })
		.catch(( error ) => {});
	}

	// TODO change the "Client Review" input below to a star selection out of 5

	// TODO "Client Review Details" input only shows if "Client Review" is 3 or less (otherwise clientReviewDetails = null)

	// TODO change the "Client Show Details" input to a list of pre-populated reasons - ask Tom Smith for the list
	// Final option is "other" in which case they can manually enter a reason

	return (
		<View style={modalStyles.content}>
			<Text style={modalStyles.headerStyle}>
				{jobApplication.medic.name}
			</Text>

			<View style={formStyles.formInput}>
				<TextInput
				  style={formStyles.textInput}
		          placeholder="Review"
		          value={clientReview}
		          onChangeText={setclientReview}
		        />
		    </View>

		    <View style={formStyles.formInput}>
		        <TextInput
				  style={formStyles.textAreaInput2}
		          placeholder="Details"
		          value={clientReviewDetails}
		          onChangeText={setclientReviewDetails}
		          multiline = {true}
                  numberOfLines = {5}
		        />
		    </View>

	        <TouchableOpacity
	            onPress={() => submit()}
	            style={formStyles.buttonWide}>
	            <Text style={formStyles.buttonText}>Submit Completed Job</Text>
	         </TouchableOpacity>

	         <TouchableOpacity
	         	onPress={() => callbackOnClose(false)}
	         	style={formStyles.closeButton}>
	            <Text style={formStyles.closeButtonText}>Close</Text>
	        </TouchableOpacity>
		</View>
	);
}

export default JobApplicationCompleted;