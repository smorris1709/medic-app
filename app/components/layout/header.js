import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import * as RootNavigation from '../navigation/root-navigation';
import * as Icons from '../../assets/icons'
import * as Images from '../../assets/images'
import styles from '../../assets/styles/layout/header-styles'

function Header(props) {
  if (props.authorised === false) {
    return (
      <View style={headerWrapper}>
        <Image source={headerLogo} style={logoImage} />
      </View>
    );
  }

  if (props.userType === 'medic') {
    return (
      <View style={styles.headerWrapper}>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Job Applications')}
          style={profileLink}>
          <View style={imageWrapper}>
            <Image source={jobListIcon} style={jobsIcon} />
          </View>
        </TouchableOpacity>

        <Image source={headerLogo} style={logoImage} />

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Profile')}
          style={profileLink}>
          <View style={imageWrapper}>
            <Image source={profileIconGreen} style={profileIcon} />
          </View>
        </TouchableOpacity>

      </View>
    );
  }

  if (props.userType === 'client') {
    return (
      <View style={styles.headerWrapper}>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Job Applications')}
          style={profileLink}>
          <View style={imageWrapper}>
            <Image source={jobListIcon} style={jobsIcon} />
          </View>
        </TouchableOpacity>

        <Image source={headerLogo} style={logoImage} />

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Profile')}
          style={profileLink}>
          <View style={imageWrapper}>
            <Image source={profileIconGreen} style={profileIcon} />
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const {profileIconGreen, jobListIcon, jobListApprovedIcon} = Icons;
const {headerLogo} = Images;
const {headerWrapper, logoImage, profileLink, imageWrapper, text, profileIcon,
  jobsIcon,
} = styles;

export default Header;
