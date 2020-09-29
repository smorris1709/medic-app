import * as React from 'react';
import {Switch, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../../context/auth-context-provider';
import {getMe, deleteMe} from '../../../services/me/me';
import styles from '../../../assets/styles/me/profileStyles'
import screenStyles from '../../../assets/styles/layout/screen-styles'
import * as Images from '../../../assets/images'
import * as Icons from '../../../assets/icons'
import RowPercentCircle from './components/row-percent-circle'
import * as Helpers from './Helpers/helpers'
import ScreenHeader from '../../global/screen-header'
import LatestAlert from './components/latest-alert'

const {dashHeader} = Images
const {goldCup, silverCup, bronzeCup, logOut} = Icons
const {switchStyle, wrapper, twoItemRow, twoItemRowSwitch, logImage, headerStyle, latestAlertStyle, listText, listTextTwo, lhsBox, rhsBox, borderBox, boxWrapper, lowerBoxWrapper} = styles

function ProfileScreen({navigation}) {
  const {authContext, userType} = React.useContext(AuthContext);
  const [me, setMe] = React.useState([]);
  const [subscriptionCup, setSubscriptionCup] = React.useState([]);
	const [isDarkModeEnabled, setDarkMode] = React.useState(false)

  useFocusEffect(
    React.useCallback(() => {
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
    }, []),
  );

  const deleteAccount = () => {
    let confirmed = false;

    // TODO popup to swap confirmed to true
    // stating to the user that this action can not be reversed

    deleteMe(confirmed)
      .then(response => {
        // TODO
      })
      .catch(error => {});
  };

 	return (
		<View style={screenStyles.wrapper}>

			<ScreenHeader
                height={null}
                bottomBorder={false}
                backgroundImage={null}
                title={"Your Profile"}
                rightContent={
                	<Image source={subscriptionCup} style={{width: 45, height: 40}} />
                }
            />

            <LatestAlert marginBottom={10} />

			<ScrollView>
				<View style={screenStyles.main}>
		     		<View style={boxWrapper}>
		       			<View style={lhsBox}>
							{userType === 'medic' &&
			            		<>
									{Helpers.listOneMedic}
								</>
							}
							{userType === 'client' &&
			            	<>
								{Helpers.listOneClient}
								</>
							}
						</View>

						{userType === 'medic' &&
							<>
								<View style={rhsBox}>
									<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
										<RowPercentCircle
											rowTitle="Profile"
											uiText={me.percentage_of_profile_completed}
											navigateTo="Profile"
											source="profile"
										/>
									</TouchableOpacity>

									{/* On click: navigation.navigate('TODO') & uiText = TODO */}
									<TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
										<RowPercentCircle
											rowTitle="ID Check"
											uiText="50"
											navTo="Dashboard"
											source="profile"
										/>
									</TouchableOpacity>
								</View>
							</>
						}
		      		</View>

					<View style={lowerBoxWrapper}>
						{Helpers.listTwo}
					</View>

					<View style={borderBox}>
						<TouchableOpacity
							onPress={() => deleteMe()}
							style={twoItemRowSwitch}
						>
							<Text style={listText}>Dark Mode</Text>

							<Switch value={true}
								value={isDarkModeEnabled}
								style={switchStyle}
								onValueChange={value => setDarkMode(value)}
		            			style={{ transform:[{ scaleX: .8 }, { scaleY: .8 }] }}
							/>

						</TouchableOpacity>
					</View>

					<View style={borderBox}>
						<TouchableOpacity
							onPress={() => authContext.signOut()}
							style={twoItemRow}
						>
							<Image source={logOut}  style={logImage}/>
							<Text style={listText}>Logout</Text>
						</TouchableOpacity>
					</View>

					<View style={borderBox}>
						<TouchableOpacity
							onPress={() => deleteAccount()}>
							<Text style={listText}>Delete Account</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default ProfileScreen;
