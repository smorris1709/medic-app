import * as React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Job from './Helpers/job.js';
import SwipeGuide from './Helpers/swipe-guide';
import {getJobs, getInterestedJobs, getRecentlyViewedJobs} from '../../../services/medic/jobs';
import screenStyles from '../../../assets/styles/layout/screen-styles'
import * as Icons from '../../../assets/icons';
import ScreenHeader from '../../global/screen-header'

function JobIndexScreen({ route, navigation }) {

	const [title, setTitle] = React.useState([]);
	const [icon, setIcon] = React.useState([]);
	const [jobs, setJobs] = React.useState([]);

	// I use both useEffect and useFocusEffect as the two together
	// seem to keep the page refreshing every time it's opened
	// and reflect the route.params.indexType value.

	React.useEffect(() => {
	   loadScreen(route.params.indexType);
	 }, [route.params.indexType]);

	useFocusEffect(
	    React.useCallback(() => {
	    	loadScreen(route.params.indexType);
	    }, [])
	);

	const loadScreen = (routeIndexType) => {
    	if(routeIndexType == 'jobs')
    	{
    		setTitle('Jobs');
    		setIcon(Icons.magGlass);

	   		getJobs('')
			.then(( response ) => {
		    	setJobs(response);
		    })
		    .catch(( error ) => {});
		}
		else if(routeIndexType == 'interested-jobs')
    	{
    		setTitle('Liked Jobs');
    		setIcon(Icons.likeIcon);

	   		getInterestedJobs('')
			.then(( response ) => {
		    	setJobs(response);
		    })
		    .catch(( error ) => {});
		}
		else if(routeIndexType == 'recently-viewed-jobs')
    	{
    		setTitle('Recently Viewed Jobs');
    		setIcon(Icons.magGlass);

	   		getRecentlyViewedJobs('')
			.then(( response ) => {
		    	setJobs(response);
		    })
		    .catch(( error ) => {});
		}
	}

	const removeItem = (index) => {
		let newJobs = [...jobs];
        newJobs.splice(index, 1)
        setJobs(newJobs);
	}

	return (
		<View style={screenStyles.wrapper}>
	      	<ScreenHeader
		        height={null}
		        bottomBorder={true}
		        backgroundImage={null}
		        title={title}
		        subtitle={null}
		        rightContent={
		        	<Image source={icon} style={{width: 35, height: 35}} />
		        }
		    />

	    	<SwipeGuide/>

	      	<View style={screenStyles.main}>
				<FlatList
					data={jobs}
					keyExtractor = { (item, index) => index.toString() }
					renderItem={({ item, index }) => (
						<Job
	                    	job={item}
	                    	index={index}
	                    	removeItemCallback={removeItem} />
					)}
				/>
			</View>
		</View>
	);
}

export default JobIndexScreen;
