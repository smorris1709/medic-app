import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import modalStyles from '../../../../assets/styles/modal-styles'
import formStyles from '../../../../assets/styles/form-styles'
import {noShowJobApplication} from '../../../../services/client/job-applications';

function JobApplicationNoShow({jobApplication, callbackOnClose}) {

	const [userNoShowDetails, setUserNoShowDetails] = React.useState(null);

	const submit = () => {
	    noShowJobApplication(jobApplication.id, userNoShowDetails)
		.then(( response ) => {
	    	callbackOnClose(true, response);
	    })
		.catch(( error ) => {});
	}

	// TODO change the "No Show Details" input to a list of pre-populated reasons - ask Tom Smith for the list
	// Final option is "other" in which case they can manually enter a reason

	return (
		<View style={modalStyles.content}>
			<Text style={modalStyles.headerStyle}>
				{jobApplication.medic.name}
			</Text>

			<View style={formStyles.formInput}>				
				<TextInput
				  style={formStyles.textAreaInput2}
		          placeholder="No Show Details"
		          value={userNoShowDetails}
		          onChangeText={setUserNoShowDetails}
		          multiline = {true}
                  numberOfLines = {5}
		        />
		    </View>

	        <TouchableOpacity
	            onPress={() => submit()}
	            style={formStyles.buttonWide}>
	            <Text style={formStyles.buttonText}>Submit No Show</Text>
	         </TouchableOpacity>

	         <TouchableOpacity
	         	onPress={() => callbackOnClose(false)}
	         	style={formStyles.closeButton}>
	            <Text style={formStyles.closeButtonText}>Close</Text>
	        </TouchableOpacity>
		</View>
	);
}

export default JobApplicationNoShow;