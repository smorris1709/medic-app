import * as React from 'react'
import { Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native'
import * as RootNavigation from '../../../navigation/root-navigation';
import * as Data from './data'
import styles from '../../../../assets/styles/me/profileStyles'
import mdocstyles from '../styles/myDocumentStyles'

const {listText, listTextTwo, borderBox} = styles
const medicOneArray = Data.profileLinksOneMedic
const clientOneArray = Data.profileLinksOneClient
const twoArray = Data.profileLinksTwo

export const listOneMedic = medicOneArray.map((item, i) => {
	return (
    <View style={borderBox} key={i}>
      <TouchableOpacity
  			onPress={() => RootNavigation.navigate(item.nav)}>
  			<Text style={listText}>{item.title}</Text>
  		</TouchableOpacity>
    </View>
	)
})

export const listOneClient = clientOneArray.map((item, i) => {
	return (
    <View style={borderBox} key={i}>
      <TouchableOpacity
  			onPress={() => RootNavigation.navigate(item.nav)}>
  			<Text style={listText}>{item.title}</Text>
  		</TouchableOpacity>
    </View>
	)
})

export const listTwo = twoArray.map((item, i) => {
	return (
    <View style={borderBox} key={i}>
  		<TouchableOpacity
  			onPress={() => RootNavigation.navigate(item.nav)}>
  			<Text style={listText}>{item.title}</Text>
  		</TouchableOpacity>
    </View>
	)
})

export const renderCV = (arr, viewPdf) => {
	return arr.map(cv => {
		return (
			<TouchableOpacity
					onPress={() => viewPdf(cv.file_path)}
					key={cv.id}
					style={mdocstyles.buttonWrapper}
				>
					<Text style={mdocstyles.buttonText}> View CV {cv.file_name}</Text>
			</TouchableOpacity>
		)
	})
}

export const renderDbs = (arr, viewPdf) => {
	return arr.map(dbs => {
		return (
				<TouchableOpacity
					onPress={() => viewPdf(dbs.file_path)}
					key={dbs.id}
					style={mdocstyles.buttonWrapper}
				>
					<Text style={mdocstyles.buttonText}> View DBS {dbs.file_name}  </Text>
				</TouchableOpacity>
		)
	})
}

export const uploadFileToDevice = (arr, savePdfToDevice) => {
	return arr.map(cv => {
		return (
				<TouchableOpacity
					onPress={() => savePdfToDevice(cv.file_name)}
					key={cv.id}
					style={mdocstyles.buttonWrapper}
				>
					<Text style={mdocstyles.buttonText}>
						Upload File to Device {cv.file_name}
					</Text>
				</TouchableOpacity>
		)
	})
}

export async function requestLocationPermission()
{
  try {
    const granted = await PermissionsAndroid.request(
			//  this is for location need permission for files
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'pts-app',
        'message': 'pts-app access to your location'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    } else {
      console.log("location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
