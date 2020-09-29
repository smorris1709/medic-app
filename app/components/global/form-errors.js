import * as React from 'react';
import { View, Text } from 'react-native'
import formStyles from '../../assets/styles/form-styles'

function FormErrors(props) {

	const { formErrors } = props;

	return (
		<>
			{ formErrors.length !== 0 &&
				<View style={formStyles.formErrorsContainer}>
					{formErrors.map((item, i) => {
						return (
							<Text style={formStyles.formError} key={i}>- {item}</Text>
						)
					})}
				</View>
			}
		</>
	);
}

export default FormErrors;
