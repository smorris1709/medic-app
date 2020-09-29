import * as React from 'react';
import { ScrollView, Platform, Text, View, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob'
import {config} from '../../../../config';

import {AuthContext} from '../../context/auth-context-provider';

import {getFiles, uploadFile, viewFile, deleteFile,} from '../../../services/misc/file';
import * as Helpers from './Helpers/helpers'

import * as Icons from '../../../assets/icons';
import TwoChildRow from './components/two-child-row';
import PickerComponent from './Helpers/pickerComponent';
import styles from './styles/myDocumentStyles';

const { documentsIcon } = Icons;

function MyDocumentsScreen() {
	const {userToken} = React.useContext(AuthContext);
	const [dbss, setDbss] = React.useState([]);
	const [cvs, setCvs] = React.useState([]);

	useFocusEffect(
	    React.useCallback(() => {
	   		getFiles('?type=cv')
				.then(( response ) => {
			    	setCvs(response);
			    })
		    .catch(( error ) => {});

		    getFiles('?type=dbs')
				.then(( response ) => {
			    	setDbss(response);
			    })
		    .catch(( error ) => {});

				Helpers.requestLocationPermission()

				{/* TODO:  These directories should lead to folders on the emulators*/}
				// console.log('CacheDir:  ', RNFetchBlob.fs.dirs.CacheDir)
				// console.log('DCIMDir:  ', RNFetchBlob.fs.dirs.DCIMDir)

				{/*Apparently DocumentDir is the only folder available to iOS*/}
				// console.log('DocumentDir:  ', RNFetchBlob.fs.dirs.DocumentDir)
				// console.log('DownloadDir:  ', RNFetchBlob.fs.dirs.DownloadDir)
				// console.log('MainBundleDir:  ', RNFetchBlob.fs.dirs.MainBundleDir)
				// console.log('LibraryDir:  ', RNFetchBlob.fs.dirs.LibraryDir)
				// console.log('MovieDir:  ', RNFetchBlob.fs.dirs.MovieDir)
				// console.log('MusicDir:  ', RNFetchBlob.fs.dirs.MusicDir)
				// console.log('PictureDir:  ', RNFetchBlob.fs.dirs.PictureDir)
				// console.log('SDCarApplicationDir:  ', RNFetchBlob.fs.dirs.SDCarApplicationDir)
				// console.log('SDCardDir:  ', RNFetchBlob.fs.dirs.SDCardDir)


	    }, [])
	);

		const viewPdf = (filePath) => {
			// TODO see if can change the file name that shows for the below on open
	    RNFetchBlob
			  .config({
			    fileCache : true,
			    appendExt : 'pdf'
			  })
				.fetch('POST', config.apiBaseUrl+'misc/file/view', {
      			Authorization : 'Bearer ' + userToken,
				},
				[
      		{ name : 'file_path',
						data : filePath
					}
				])
			  .then((res) => {
			  	if (Platform.OS === "ios") {
						console.log('This file is saved to: ', res.path())
			    	RNFetchBlob.ios.openDocument(res.path());
			    } else {
						console.log('This file is saved to: ', res.path())
			    	RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf')
			    }
			  })
				.catch((errorMessage, statusCode) => {
					console.log(statusCode, errorMessage)
    			// error handling
  			})
	    }

			const savePdfToDevice = () => {
				const filePath = 'user_files/3Mlj4pkMcMSMSP4EZsP3CRnQt6meFfj2HnQw0e2w.pdf'
				const { config, fs } = RNFetchBlob
				const downloads = fs.dirs.DownloadDir
				console.log(downloads)
				 return config({
					fileCache : true,
					appendExt : 'pdf',
					trusty: true,
					addAndroidDownloads: {
						useDownloadManager: true,
						notification: true,
						path: downloads + '/' + filePath + '.pdf',
					}
				})
				.fetch('GET', 'http://samples.leanpub.com/thereactnativebook-sample.pdf', {
						// Authorization : 'Bearer ' + userToken,
				},
				[
					{ name : 'file_path',
						data : filePath
					}
				])
				.then(res => {
					console.log('resonse from savePdfToDevice:  ', res)
				})

				.catch((errorMessage, statusCode) => {
					console.log(statusCode, errorMessage)
					// error handling
				})
			}


	/*
	TODO

	for cv;
	if (no cv) {
		a button to uploadFile with type='cv'
		(state that it can only be a PDF otherwise it will not be accepted)
	} else {
		button to viewFile
		button to deleteFile
	}

	for dbs;
	same as above
	*/

	return (
		<View style={styles.wrapper}>
			<TwoChildRow
				rowTitle="My Documents!"
				uIElement={documentsIcon}
			/>
			<View style={styles.container}>
				{Helpers.renderCV(cvs, viewPdf)}
 				{Helpers.renderDbs(dbss, viewPdf)}
			 </View>
			 <View style={styles.container}>
				 {/* TODO:  Logic/function to remove CV from API */}
				 <TouchableOpacity
					 onPress={() => setCvs([])}
					 style={styles.buttonWrapper2}
				 >
					 <Text style={styles.buttonText}> Delete CV {cvs.file_name}  </Text>
				 </TouchableOpacity>

				 {/* TODO:  Logic/function to remove DBS from API */}
				 <TouchableOpacity
					 onPress={() => setDbss([])}
					 style={styles.buttonWrapper2}
				 >
					 <Text style={styles.buttonText}> Delete Dbs {dbss.file_name}</Text>
				 </TouchableOpacity>
		 	</View>
			<View style={styles.container}>
			 {Helpers.uploadFileToDevice(cvs, savePdfToDevice)}
			</View>
			 <PickerComponent/>
		</View>
	);
}

export default MyDocumentsScreen;
