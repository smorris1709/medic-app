import * as React from 'react';
import { SafeAreaView } from 'react-native';
import Header from './header'
import StackNavigator from '../navigation/stack-navigator'
import Footer from './footer'
import styles from '../../assets/styles/layout/layout-styles'

function Layout(props) {
  return (
    <SafeAreaView style={styles.main}>
      <Header authorised={props.authorised} userType={props.userType} />
      <StackNavigator authorised={props.authorised} userType={props.userType} />
      <Footer authorised={props.authorised} userType={props.userType} />
   </SafeAreaView>
  );
}

export default Layout;
