import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import * as RootNavigation from '../navigation/root-navigation';
import styles from '../../assets/styles/layout/footer-styles'
import * as Icons from '../../assets/icons'
// styles and Icons are referenced at the bottom of the page

function Footer(props) {

  if(props.authorised == false) {
    return (
      <View style={footerWrapper}>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Sign In')}
          style={touchOButton}
        >
          <View style={imageWrapper}>
            <Image source={profileIconGreyBorder2} style={iconStyle} />
          </View>
          <Text style={text}> Sign In </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (props.userType === 'medic') {
    return (
      <View style={footerWrapperDashboard}>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Jobs', {indexType: 'interested-jobs'})} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image source={likeNoFocus} style={iconStyleDashboard} />
          </View>
          <Text style={text}>Liked Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            RootNavigation.navigate('Jobs', {indexType: 'jobs'})
          }
          style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image source={jobsNoFocus} style={iconStyleDashboard} />
          </View>
          <Text style={text}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Dashboard')} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image
              source={dashFocus}
              style={{...iconStyleDashboard, ...focused}}
            />
          </View>
          <Text style={text}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Alerts')} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image source={alertNoFocus} style={iconStyleDashboard} />
          </View>
          <Text style={text}>Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Job Applications')} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image source={appliedNoFocus} style={iconStyleDashboard} />
          </View>
          <Text style={text}>Applications</Text>
        </TouchableOpacity>
      </View>
    );
  }
  //
  if(props.userType == 'client') {
    return (
      <View style={footerWrapperDashboard}>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Post A Job', {job_id: null})} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image source={jobsPlusSign} style={iconStyleDashboard} />
          </View>
          <Text style={text}>Post Job</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Jobs')} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image source={jobsNoFocus} style={iconStyleDashboard} />
          </View>
          <Text style={text}>Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Dashboard')} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image
              source={dashFocus}
              style={{...iconStyleDashboard, ...focused}}
            />
          </View>
          <Text style={text}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Alerts')} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image source={alertNoFocus} style={iconStyleDashboard} />
          </View>
          <Text style={text}>Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => RootNavigation.navigate('Job Applications')} style={touchOButtonDash}>
          <View style={imageWrapper}>
            <Image source={appliedNoFocus} style={iconStyleDashboard} />
          </View>
          <Text style={text}>Applications</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const {profileIconGreyBorder2, alertNoFocus, jobsPlusSign, likeNoFocus,
  dashFocus, appliedNoFocus, jobsNoFocus} = Icons;
const {footerWrapper, footerWrapperDashboard, text, iconStyle, iconStyleDashboard,
  touchOButton, imageWrapper, touchOButtonDash, textDashboard, focused, } = styles;

export default Footer;
