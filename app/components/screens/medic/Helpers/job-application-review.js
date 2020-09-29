import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import modalStyles from '../../../../assets/styles/modal-styles'
import formStyles from '../../../../assets/styles/form-styles'
import {reviewJobApplication} from '../../../../services/medic/job-applications';

function JobApplicationReview({jobApplication, callbackOnClose}) {

	const [medicReview, setMedicReview] = React.useState(null);
	const [medicReviewDetails, setMedicReviewDetails] = React.useState(null);

	const submit = () => {
	    reviewJobApplication(jobApplication.id, medicReview, medicReviewDetails)
		.then(( response ) => {
	    	callbackOnClose(true, response);
	    })
		.catch(( error ) => {});
	}

	// TODO change the "Medic Review" input below to a star selection out of 5
	
	// TODO "Medic Review Details" input only shows if "Medic Review" is 3 or less (otherwise medicReviewDetails = null)

	// TODO change the "Medic Review Details" input to a list of pre-populated reasons - ask Tom Smith for the list
	// Final option is "other" in which case they can manually enter a reason

	return (
		<View style={modalStyles.content}>
			<Text style={modalStyles.headerStyle}>
				{jobApplication.job.title}
			</Text>

			<View style={formStyles.formInput}>				
				<TextInput
				  style={formStyles.textInput}
		          placeholder="Review"
		          value={medicReview}
		          onChangeText={setMedicReview}
		        />
		    </View>

		    <View style={formStyles.formInput}>
		        <TextInput
		          style={formStyles.textAreaInput2}
		          placeholder="Details"
		          value={medicReviewDetails}
		          onChangeText={setMedicReviewDetails}
		          multiline = {true}
                  numberOfLines = {5}
		        />
		    </View>

	        <TouchableOpacity
	            onPress={() => submit()}
	            style={formStyles.buttonWide}>
	            <Text style={formStyles.buttonText}>Submit Review</Text>
	         </TouchableOpacity>

	         <TouchableOpacity
	         	onPress={() => callbackOnClose(false)}
	         	style={formStyles.closeButton}>
	            <Text style={formStyles.closeButtonText}>Close</Text>
	        </TouchableOpacity>
		</View>
	);
}

export default JobApplicationReview;