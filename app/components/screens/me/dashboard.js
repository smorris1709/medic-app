import * as React from 'react';
import {Text, View, ScrollView, Image, FlatList, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import styles from '../../../assets/styles/me/dashboardStyles'
import screenStyles from '../../../assets/styles/layout/screen-styles'
import {AuthContext} from '../../context/auth-context-provider';
import {getMe} from '../../../services/me/me';
import {getJobs} from '../../../services/medic/jobs';
import {getJobApplications} from '../../../services/client/job-applications';
import Job from '../medic/Helpers/job.js';
import SwipeGuide from '../medic/Helpers/swipe-guide';
import JobApplication from '../client/Helpers/job-application.js';
import * as Images from '../../../assets/images';
import * as Icons from '../../../assets/icons';
import TwoChildRow from './components/two-child-row';
import RowPercentCircle from './components/row-percent-circle';
import {medicJobsArray} from './Helpers/jobsData'
import ScreenHeader from '../../global/screen-header'
import LatestAlert from './components/latest-alert'

const {dashHeader} = Images
const {houseIcon, goldCup, silverCup, bronzeCup, bellIcon, plusSign, magGlass, profileIcon} = Icons

function DashboardScreen({navigation}) {

  const {authContext, userType} = React.useContext(AuthContext);

  const [me, setMe] = React.useState([]);
  const [subscriptionCup, setSubscriptionCup] = React.useState([]);
  const [medicFeaturedJobs, setMedicFeaturedJobs] = React.useState([]);
  const [
    clientRecentJobApplications,
    setClientRecentJobApplications,
  ] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {

      // me
      getMe()
        .then(response => {
          setMe(response);

          if(response.subscription_type == 'gold') {
            setSubscriptionCup(goldCup);
          } else if(response.subscription_type == 'silver') {
            setSubscriptionCup(silverCup);
          } else if(response.subscription_type == 'bronze') {
            setSubscriptionCup(bronzeCup);
          }

        })
        .catch(error => {});

      if (userType === 'medic') {
        // medicFeaturedJobs
        getJobs('?ranking=1')
          .then(response => {
            setMedicFeaturedJobs(response);
          })
          .catch(error => {});

      } else if (userType === 'client') {
        // clientRecentJobApplications
        getJobApplications('?order_by=created_at&order=desc&per_page=3')
          .then(response => {
            setClientRecentJobApplications(response);
          })
          .catch(error => {});
      }
    }, []),
  );

  const removeMedicFeaturedJobsItem = (index) => {
    let newMedicFeaturedJobs = [...medicFeaturedJobs];
    delete newMedicFeaturedJobs[index];
    setMedicFeaturedJobs(newMedicFeaturedJobs);
  }

  return (
    <View style={screenStyles.wrapper}>

      <ScreenHeader
        height={110}
        bottomBorder={false}
        backgroundImage={dashHeader}
        title={"Welcome to \nyour Dashboard"}
        subtitle={null}
        rightContent={
          <Image source={houseIcon} style={{width: 45, height: 40}} />
        }
      />

      <LatestAlert marginBottom={0} />

      <ScrollView>
        <View style={screenStyles.main}>
          {userType === 'medic' &&
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <RowPercentCircle
                  rowTitle="Profile Completion"
                  uiText={me.percentage_of_profile_completed}
                  navigateTo="Profile"
                  source="dashboard"
                />
              </TouchableOpacity>

              {/* On click: navigation.navigate('TODO') & uiText = TODO */}
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <RowPercentCircle
                  rowTitle="ID Check Completion"
                  uiText="50"
                  navTo="Dashboard"
                  source="dashboard"
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <TwoChildRow rowTitle="Subscription Level" uIElement={subscriptionCup} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('Job Preferences')}>
                <View style={styles.rowCell1}>
                  <Text style={styles.rowTitle}>Job Preferences</Text>
                  <Text style={styles.rowText}>Click here to manage your Job Preferences.</Text>
                </View>
                <View style={styles.rowCell2}>
                  <Image source={profileIcon} style={styles.rowImage} />
                </View>
              </TouchableOpacity>

              <View>
                <View style={styles.jobsWrapper}>
                  <Text style={styles.jobsWrapperText}>Featured Jobs</Text>
                </View>

                {medicFeaturedJobs.map((item, i) => {
                  return (
                    <Job
                      job={item}
                      key={i}
                      index={i}
                      removeItemCallback={removeMedicFeaturedJobsItem} />
                  )
                })}
               </View>
            </>
          }

          {userType === 'client' &&
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Post A Job', {job_id: null})}>
                <TwoChildRow rowTitle="Post A Job" uIElement={plusSign} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
                <TwoChildRow rowTitle="View Posted Jobs" uIElement={magGlass} />
              </TouchableOpacity>

              <TouchableOpacity>
                <TwoChildRow rowTitle="Subscription Level" uIElement={subscriptionCup} />
              </TouchableOpacity>
            
              <View style={styles.row}>
                <View style={styles.rowCell1}>
                  <Text style={styles.rowTitle}>Urgent Job?</Text>
                  <Text style={styles.rowText}>Send a Flash Message from the Job's Profile page.</Text>
                </View>
                <View style={styles.rowCell2}>
                  <Image source={bellIcon} style={styles.rowImage} />
                </View>
              </View>
            
  				    <View>
                <View style={styles.jobsWrapper}>
                  <Text style={styles.jobsWrapperText}>Recent Job Applications</Text>
                </View>

                {clientRecentJobApplications.map((item, i) => {
                  return (
                    <JobApplication jobApplication={item} key={i} />
                  )
                })}
      				</View>
            </>
    			}
  		</View>
    </ScrollView>
    </View>
  );
}
export default DashboardScreen;
