import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker'

import * as Icons from '../../../../assets/icons'

const {downloadIcon} = Icons

import {getFiles, uploadFile, viewFile, deleteFile,} from '../../../../services/misc/file';

function PickerComponent() {
  const [singleFile, setSingleFile] = React.useState("");

  async function selectOneFile() {
    try {
      const res = await DocumentPicker.pick({
        //  Specify the file type must be a PDF
        type: [DocumentPicker.types.pdf]
       // Other file type options .allFiles .images .plainText .audio
      })

      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);

      this.setSingleFile({singleFile: res})

      {/*TODO:  Save the file to API */}
      uploadFile(res, cv)
      .then(( response ) => {
        setSingleFile(response);
       })
      .catch(( error ) => {});

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  return (
    <View style={styles.wrapper}>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectOneFile}>
          {/*Single file selection button*/}
          <Text style={styles.textStyle}>
            Load CV *
          </Text>
          <Image
            source={downloadIcon}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>

        <Text style={styles.textStyle2}>* File type can only be a PDF</Text>

        {/*Showing the data of selected Single file*/}
        <Text style={styles.textStyle3}>
          File Name:{' '}
          {singleFile.name ? singleFile.name : ' No CV at present'}
          {'\n'}  {'\n'}
          Type: {singleFile.type ? singleFile.type : '...'}
          {'\n'}  {'\n'}
          File Size:{' '}
          {singleFile.size ? singleFile.size : '...'}
          {'\n'}  {'\n'}
          URI: {singleFile.uri ? singleFile.uri : '...'}
          {'\n'}  {'\n'}
        </Text>

    </View>
  )
}

const styles = StyleSheet.create({
	wrapper: {
		// backgroundColor: 'pink',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		height: '100%',
    paddingLeft: 30,
    width: '100%',
	},
	titleTxt: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
		marginBottom: 15,
    // backgroundColor: 'pink',
  },
  pickerStyles: {
    backgroundColor: '#4d4d4d',
    width: '100%'
  },
  textStyle: {
    backgroundColor: '#333333',
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  textStyle2: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
    marginBottom: 15,
  },
  textStyle3: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#333333',
    fontSize: 12,
    color: '#fff',
    marginRight: 10,
    padding: 10,
    paddingBottom: 0,
    left: -12,
  },
  buttonStyle: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#333333',
    height: 45,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: '47%',
    left: -12,
  },
  imageIconStyle: {
    height: 15,
    width: 15,
    resizeMode: 'stretch',
  },
})

export default PickerComponent
