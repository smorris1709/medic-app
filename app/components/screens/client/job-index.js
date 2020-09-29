import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Job from './Helpers/job.js';
import {getJobs} from '../../../services/client/jobs';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import formStyles from '../../../assets/styles/form-styles'
import ScreenHeader from '../../global/screen-header'
import * as Icons from '../../../assets/icons';

function JobIndexScreen({navigation}) {

	const [jobs, setJobs] = React.useState([]);

	useFocusEffect(
	    React.useCallback(() => {
	   		getJobs('')
			.then(( response ) => {
		    	setJobs(response);
		    })
		    .catch(( error ) => {});
	    }, [])
	);

	return (
		<View style={screenStyles.wrapper}>
    
      <ScreenHeader
          height={null}
          bottomBorder={true}
          backgroundImage={null}
          title={"Jobs"}
          subtitle={null}
          rightContent={
            <Image source={Icons.magGlass} style={{width: 35, height: 35}} />
          }
      />

      <View style={screenStyles.main}>
  			<FlatList
  				data={jobs}
  				keyExtractor = { (item, index) => index.toString() }
  				renderItem={({ item }) => (
  					<Job job={item} />
  				)} />
  		</View>
    </View>
	);
}

export default JobIndexScreen;
