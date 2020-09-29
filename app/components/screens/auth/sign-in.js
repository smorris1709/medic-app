import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../../assets/styles/auth/sign-in-styles'
import {AuthContext} from '../../context/auth-context-provider';

const {
  textInput,
  signInWrapper,
  headerStyle,
  wrapper,
  signInButton,
  buttonText,
  forgotPWButton,
  text,
  button,
  signUpWrapper,
} = styles;

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {authContext} = React.useContext(AuthContext);

  return (
    <View style={wrapper}>
      <ScrollView>
        <View style={signInWrapper}>
          <Text style={headerStyle}>
            Sign In to {'\n'} Find Your Next {'\n'} Medical Role
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="Email address"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <TextInput
            style={textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => authContext.signIn({email, password})}
            style={signInButton}>
            <Text style={buttonText}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={forgotPWButton}
            onPress={() => navigation.navigate('Forgot Password')}>
            <Text style={button}>Forgot Password?</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
}

export default SignInScreen;
