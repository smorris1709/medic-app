import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from '../screens/auth/sign-in';
import ForgotPasswordScreen from '../screens/auth/forgot-password';

import AlertsScreen from '../screens/me/alerts';
import DashboardScreen from '../screens/me/dashboard';
import InvoicesScreen from '../screens/me/invoices';
import MyDocumentsScreen from '../screens/me/my-documents';
import NotificationSettingsScreen from '../screens/me/notification-settings';
import PasswordUpdateScreen from '../screens/me/password-update';
import ProfileUpdateScreen from '../screens/me/profile-update';
import ProfileScreen from '../screens/me/profile';

import AboutScreen from '../screens/static/about';
import FAQScreen from '../screens/static/faq';
import PartnersScreen from '../screens/static/partners';
import PrivacyPolicyScreen from '../screens/static/privacy-policy';
import SupportScreen from '../screens/static/support';
import TermsAndConditionsScreen from '../screens/static/terms-and-conditions';

import MedicJobApplicationsIndexScreen from '../screens/medic/job-application-index';
import MedicJobApplicationsShowScreen from '../screens/medic/job-application-show';
import MedicJobIndexScreen from '../screens/medic/job-index';
import MedicJobPreferenceUpdateScreen from '../screens/medic/job-preference-update';
import MedicJobShowScreen from '../screens/medic/job-show';

import ClientJobApplicationsIndexScreen from '../screens/client/job-application-index';
import ClientJobApplicationsShowScreen from '../screens/client/job-application-show';
import ClientJobIndexScreen from '../screens/client/job-index';
import ClientJobShowScreen from '../screens/client/job-show';
import ClientJobStoreScreen from '../screens/client/job-store';

const Stack = createStackNavigator();

function StackNavigator(props) {

    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
            {props.authorised == false ? (
                <>
                  <Stack.Screen name="Sign In" component={SignInScreen} />
                  <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
                </>
            ) : (
                props.userType == 'medic' ? (
                  <>
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />

                    <Stack.Screen name="Alerts" component={AlertsScreen} />
                    <Stack.Screen name="Invoices" component={InvoicesScreen} />
                    <Stack.Screen name="My Documents" component={MyDocumentsScreen} />
                    <Stack.Screen name="Notification Settings" component={NotificationSettingsScreen} />
                    <Stack.Screen name="Password Update" component={PasswordUpdateScreen} />
                    <Stack.Screen name="Profile Update" component={ProfileUpdateScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />

                    <Stack.Screen name="About" component={AboutScreen} />
                    <Stack.Screen name="FAQ" component={FAQScreen} />
                    <Stack.Screen name="Partners" component={PartnersScreen} />
                    <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
                    <Stack.Screen name="Support" component={SupportScreen} />
                    <Stack.Screen name="T&Cs" component={TermsAndConditionsScreen} />

                    <Stack.Screen name="Job Applications" component={MedicJobApplicationsIndexScreen} />
                    <Stack.Screen name="Job Application" component={MedicJobApplicationsShowScreen} />
                    <Stack.Screen name="Jobs" component={MedicJobIndexScreen} />
                    <Stack.Screen name="Job Preferences" component={MedicJobPreferenceUpdateScreen} />
                    <Stack.Screen name="Job" component={MedicJobShowScreen} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />

                    <Stack.Screen name="Alerts" component={AlertsScreen} />
                    <Stack.Screen name="Invoices" component={InvoicesScreen} />
                    <Stack.Screen name="My Documents" component={MyDocumentsScreen} />
                    <Stack.Screen name="Notification Settings" component={NotificationSettingsScreen} />
                    <Stack.Screen name="Password Update" component={PasswordUpdateScreen} />
                    <Stack.Screen name="Profile Update" component={ProfileUpdateScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />

                    <Stack.Screen name="About" component={AboutScreen} />
                    <Stack.Screen name="FAQ" component={FAQScreen} />
                    <Stack.Screen name="Partners" component={PartnersScreen} />
                    <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
                    <Stack.Screen name="Support" component={SupportScreen} />
                    <Stack.Screen name="T&Cs" component={TermsAndConditionsScreen} />

                    <Stack.Screen name="Job Applications" component={ClientJobApplicationsIndexScreen} />
                    <Stack.Screen name="Job Application" component={ClientJobApplicationsShowScreen} />
                    <Stack.Screen name="Jobs" component={ClientJobIndexScreen} />
                    <Stack.Screen name="Job" component={ClientJobShowScreen} />
                    <Stack.Screen name="Post A Job" component={ClientJobStoreScreen} />
                  </>
                )
            )}
        </Stack.Navigator>
    );
}

export default StackNavigator;
