import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import {displayablePrice} from '../../../global/helpers';
import * as RootNavigation from '../../../navigation/root-navigation';
import styles from '../../../../assets/styles/medic/jobStyles'
import * as icons from '../../../../assets/icons'
import {markJobAsInterested, markJobAsNotInterested} from '../../../../services/medic/jobs';
import {storeJobApplication} from '../../../../services/medic/job-applications';

const {goldStar, leftSwipeArrow, rightSwipeArrow} = icons

function Job({job, index, removeItemCallback}) {

	const markJobAsInterestedCall = () => {
		markJobAsInterested(job.id, job.matched_medic_role_id)
			.then(( response ) => {
		    	removeItemCallback(index);
		    })
			.catch(( error ) => {});
	}

	const markJobAsNotInterestedCall = () => {
  		markJobAsNotInterested(job.id, job.matched_medic_role_id)
			.then(( response ) => {
		    	removeItemCallback(index);
		    })
			.catch(( error ) => {});
	}

	const storeJobApplicationCall = () => {
    	storeJobApplication(job.id, job.matched_medic_role_id)
		.then(( response ) => {
	    	removeItemCallback(index);
	    })
		.catch(( error ) => {});
	}

	const {imageStyle, wrapper, titleTxt, txt, tapStyle, rowWrapper, darkRowWrapper, darkColWrapper} = styles

	return (
		 <View >
			<TouchableOpacity
				onPress={() => RootNavigation.navigate('Job', {job_id: job.id}) }
			>
				<View style={wrapper}>

					<Text style={titleTxt}>{ job.title }</Text>
					<View style={rowWrapper}>
						<Text style={titleTxt}>{ job.matched_medic_role_name }</Text>
					</View>
					<Text style={txt}>{ job.description }</Text>
					<View style={rowWrapper}>
						<Text style={txt}>{ job.start_date_human_readable }</Text>
						{ (job.start_date_human_readable !== job.end_date_human_readable) &&
							<Text style={txt}> - { job.end_date_human_readable }</Text>
						}
					</View>
					<View style={darkRowWrapper}>
						<View style={styles.rowCell}>
							<Text style={txt}>Days: { job.number_of_days }</Text>
						</View>
						<View style={styles.rowCell}>
							<Text style={txt}>Hours: { job.total_number_of_hours }</Text>
						</View>
						<View>
							<Text style={txt}>Rate/Hour: { displayablePrice(job.matched_medic_role_rate_per_hour) }</Text>
						</View>
					</View>
					<View style={darkColWrapper}>
						<Text style={titleTxt}>Client</Text>
						<View style={rowWrapper}>
							<Text style={txt}>Name: { job.client.name }</Text>
							{ job.client.user_rating !== null &&
								<>
									<Text style={txt}>{ job.client.user_rating }</Text>
									<Image source={goldStar} style={imageStyle}/>
								</>
							}
						</View>
						<Text style={txt}>Email: { job.client.email }</Text>
						<Text style={txt}>Contact: { job.client.mobile }</Text>
					</View>

					<TouchableOpacity
	                    style={styles.button}
	                    onPress={() => storeJobApplicationCall() }>
	                    <Text style={styles.buttonText}>Apply</Text>
	                </TouchableOpacity>
				</View>

				{/*
				TODO
				if (job.medic_expressed_interest == false && job.medic_dismissed === false)
					on swipe right call markJobAsInterestedCall()
					on swipe left call markJobAsNotInterestedCall()
				*/}

				{/* TODO if job.application_made == false; button "Apply" to storeJobApplicationCall() */}

			</TouchableOpacity>
		</View>
	);
}

export default Job;
