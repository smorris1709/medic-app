import * as React from 'react';
import {Text, View, TextInput, TouchableOpacity } from 'react-native';
import {forgotPassword} from '../../../services/auth/auth';
import styles from '../../../assets/styles/auth/sign-in-styles'

const {
  textInput,
  signInWrapper,
  headerStyle,
  wrapper,
  signInButton,
  buttonText,
  forgotPWButton,
  button
} = styles;

function ForgotPasswordScreen({navigation}) {

	const [email, setEmail] = React.useState('');

	const submit = () => {
    forgotPassword(email)
	  .then(( response ) => {
        // TODO Show success message
    })
    .catch(( error ) => {});
	}

  return (
    <View style={wrapper}>
      <View style={signInWrapper}>
        <Text style={headerStyle}>
          Forgot Password
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          onPress={() => submit()}
          style={signInButton}>
          <Text style={buttonText}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={forgotPWButton}
            onPress={() => navigation.navigate('Sign In')}>
            <Text style={button}>Sign In</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default ForgotPasswordScreen;
