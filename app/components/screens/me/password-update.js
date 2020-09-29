import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import formStyles from '../../../assets/styles/form-styles'
import {updatePassword} from '../../../services/me/me';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import FormErrors from '../../global/form-errors'

function PasswordUpdateScreen({navigation}) {

	const [form, setFormValues] = React.useState({
    	current_password: '',
    	new_password: '',
    	new_password_confirmation: '',
	});
	const [formErrors, setFormErrors] = React.useState([]);

	const setFormValue = (name, value) => {
		setFormValues({
	      ...form,
	      [name]: value
	    });
	};

	const submit = () => {
		updatePassword(form)
		.then(( response ) => {
	    	navigation.navigate('Profile');
	    })
	    .catch(( error ) => {
	    	setFormErrors(error.response.data.errors);
	    });
	}

	return (
		<View style={screenStyles.wrapper}>
	      	<ScreenHeader
                height={null}
                bottomBorder={true}
                backgroundImage={null}
                title={"Password Update"}
                rightContent={null}
            />

    		<View style={screenStyles.main}>

    			<FormErrors formErrors={formErrors} />

				<View style={formStyles.formInput}>
					<Text style={formStyles.formLabelWhite}>Current Password</Text>
					
					<TextInput
					  style={formStyles.textInput}
			          placeholder="Current Password"
			          value={form.current_password}
			          onChangeText={text => setFormValue('current_password', text)}
			          secureTextEntry
			        />
			    </View>

			    <View style={formStyles.formInput}>
					<Text style={formStyles.formLabelWhite}>New Password</Text>

			        <TextInput
			          style={formStyles.textInput}
			          placeholder="New Password"
			          value={form.new_password}
			          onChangeText={text => setFormValue('new_password', text)}
			          secureTextEntry
			        />
			    </View>

			    <View style={formStyles.formInput}>
					<Text style={formStyles.formLabelWhite}>New Password Confirmation</Text>

			        <TextInput
			          style={formStyles.textInput}
			          placeholder="New Password Confirmation"
			          value={form.new_password_confirmation}
			          onChangeText={text => setFormValue('new_password_confirmation', text)}
			          secureTextEntry
			        />
			    </View>

			    <View style={{ alignItems: 'center' }}>
			        <TouchableOpacity
			            onPress={() => submit()}
			            style={formStyles.button}>
			            <Text style={formStyles.buttonText}>Submit</Text>
			        </TouchableOpacity>
			    </View>
			</View>
		</View>
	);
}

export default PasswordUpdateScreen;