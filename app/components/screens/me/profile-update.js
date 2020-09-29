import * as React from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import formStyles from '../../../assets/styles/form-styles'
import {AuthContext} from '../../context/auth-context-provider';
import {getMe, updateMe} from '../../../services/me/me';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import ScreenHeader from '../../global/screen-header'
import FormErrors from '../../global/form-errors'

function ProfileUpdateScreen({navigation}) {

	const { userType } = React.useContext(AuthContext);

	const [medicForm, setMedicFormValues] = React.useState({
    	name: '', // string
    	mobile: '', // string
    	date_of_birth: '', // Y-m-d
    	paramedic_pin_number: '', // string
    	driving_licence_number: '', // string
    	professional_reg_detail: '', // string
	});

	const [clientForm, setClientFormValues] = React.useState({
    	name: '', // string
    	mobile: '', // string
    	client_name: '', // string
    	client_address_line_1: '', // string
    	client_address_line_2: '', // string
    	client_town: '', // string
    	client_county: '', // string
    	client_country: '', // string
    	client_postcode: '', // string
	});

	const [formErrors, setFormErrors] = React.useState([]);

	useFocusEffect(
	    React.useCallback(() => {
	   		getMe()
			.then(( response ) => {
		    	if(userType == 'medic') {
		    		setMedicFormValues({
				    	name: response.name,
				    	mobile: response.mobile.toString(),
				    	date_of_birth: response.date_of_birth,
				    	paramedic_pin_number: response.paramedic_pin_number,
				    	driving_licence_number: response.driving_licence_number,
				    	professional_reg_detail: response.professional_reg_detail,
					});
		    	} else if(userType == 'client') {
		    		setClientFormValues({
				    	name: response.name,
				    	mobile: response.mobile.toString(),
				    	client_name: response.client_name,
				    	client_address_line_1: response.client_address_line_1,
				    	client_address_line_2: response.client_address_line_2,
				    	client_town: response.client_town,
				    	client_county: response.client_county,
				    	client_country: response.client_country,
				    	client_postcode: response.client_postcode,
					});
		    	}
		    })
		    .catch(( error ) => {});
		}, [])
	);

	const setFormValue = (name, value) => {
		if(userType == 'medic') {
			setMedicFormValues({
		      ...medicForm,
		      [name]: value
		    });
		} else if(userType == 'client') {
			setClientFormValues({
		      ...clientForm,
		      [name]: value
		    });
		}
	};

	const submit = () => {
		if(userType == 'medic') {
			var form = medicForm;
		} else if(userType == 'client') {
			var form = clientForm;
		}

		updateMe(form)
		.then(( response ) => {
	    	navigation.navigate('Profile');
	    })
	    .catch(( error ) => {
	    	setFormErrors(error.response.data.errors);
	    });
	}

	/*
	TODO for inputs below;
	- date_of_birth to date input
	- country to country select dropdown
	*/

	return (
		<View style={screenStyles.wrapper}>
	    	<ScreenHeader
                height={null}
                bottomBorder={true}
                backgroundImage={null}
                title={"Update Account Details"}
                rightContent={null}
            />

	      	<View style={screenStyles.main}>	      		
				<ScrollView>
		      		<FormErrors formErrors={formErrors} />

					{ (userType == 'medic') &&
						<>
					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Name</Text>
								
								<TextInput
								  style={formStyles.textInput}
						          placeholder="Name"
						          value={medicForm.name}
						          onChangeText={text => setFormValue('name', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Mobile</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Mobile"
						          value={medicForm.mobile}
						          onChangeText={text => setFormValue('mobile', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>DOB</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="DOB"
						          value={medicForm.date_of_birth}
						          onChangeText={text => setFormValue('date_of_birth', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Paramedic Pin Number</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Paramedic Pin Number"
						          value={medicForm.paramedic_pin_number}
						          onChangeText={text => setFormValue('paramedic_pin_number', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Driving Licence Number</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Driving Licence Number"
						          value={medicForm.driving_licence_number}
						          onChangeText={text => setFormValue('driving_licence_number', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Professional Reg Detail</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Professional Reg Detail"
						          value={medicForm.professional_reg_detail}
						          onChangeText={text => setFormValue('professional_reg_detail', text)}
						        />
						    </View>
					    </>
				    }

					{ (userType == 'client') &&
						<>
							<View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Name</Text>

								<TextInput
								  style={formStyles.textInput}
						          placeholder="Name"
						          value={clientForm.name}
						          onChangeText={text => setFormValue('name', text)}
						        />
					        </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Mobile</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Mobile"
						          value={clientForm.mobile}
						          onChangeText={text => setFormValue('mobile', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Client Name</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Client Name"
						          value={clientForm.client_name}
						          onChangeText={text => setFormValue('client_name', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Address Line 1</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Address Line 1"
						          value={clientForm.client_address_line_1}
						          onChangeText={text => setFormValue('client_address_line_1', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Address Line 2</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Address Line 2"
						          value={clientForm.client_address_line_2}
						          onChangeText={text => setFormValue('client_address_line_2', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Town</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Town"
						          value={clientForm.client_town}
						          onChangeText={text => setFormValue('client_town', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>County</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="County"
						          value={clientForm.client_county}
						          onChangeText={text => setFormValue('client_county', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Country</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Country"
						          value={clientForm.client_country}
						          onChangeText={text => setFormValue('client_country', text)}
						        />
						    </View>

					        <View style={formStyles.formInput}>
								<Text style={formStyles.formLabelWhite}>Postcode</Text>

						        <TextInput
								  style={formStyles.textInput}
						          placeholder="Postcode"
						          value={clientForm.client_postcode}
						          onChangeText={text => setFormValue('client_postcode', text)}
						        />
						    </View>
					    </>
				    }

					<View style={{ alignItems: 'center' }}>
				        <TouchableOpacity
				            onPress={() => submit()}
				            style={formStyles.button}>
				            <Text style={formStyles.buttonText}>Submit</Text>
				        </TouchableOpacity>
				    </View>
				</ScrollView>
			</View>
		</View>
	);
}

export default ProfileUpdateScreen;