import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as RootNavigation from '../../../navigation/root-navigation';
import styles from '../../../../assets/styles/client/jobStyles'

function Job({job}) {
	return (
		<TouchableOpacity
			onPress={() => RootNavigation.navigate('Job', {job_id: job.id}) }
		>
			<View style={styles.wrapper}>
				<Text style={styles.titleTxt}>{ job.title }</Text>
				<Text style={styles.txt}>{ job.description }</Text>
				<View style={styles.rowWrapper}>
					<Text style={styles.txt}>{ job.start_date_human_readable }</Text>
					{ (job.start_date_human_readable !== job.end_date_human_readable) &&
						<Text style={styles.txt}> - { job.end_date_human_readable}</Text>
					}
				</View>
				<View style={styles.rowWrapper}>
					<View style={styles.rowCell}>
						<Text style={styles.txt}>Days: { job.number_of_days }</Text>
					</View>
					<View>
						<Text style={styles.txt}>Hours: { job.total_number_of_hours }</Text>
					</View>
				</View>
				<View style={styles.rowWrapper}>
					<Text style={styles.txt}>Open To New Applications: { job.allow_new_applications ? 'Yes' : 'No' }</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default Job;
