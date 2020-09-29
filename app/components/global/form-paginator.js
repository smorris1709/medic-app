import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../../assets/styles/form-paginator-styles'
import formStyles from '../../assets/styles/form-styles'

function FormPaginator(props) {

	const { totalPages, currentPage, submitButtonText, backCallback, nextCallback } = props;

	return (
		<View style={styles.wrapper}>
			<View style={styles.row}>
				<View style={styles.cell1}>
					{ (currentPage > 1) &&
						<TouchableOpacity
							style={formStyles.button}
							onPress={() => backCallback()}
						>
							<Text style={formStyles.buttonText}>Back</Text>
						</TouchableOpacity>
					}
				</View>

				<View style={styles.cell2}>
					{ (currentPage < totalPages) &&
						<TouchableOpacity
							style={formStyles.button}
							onPress={() => nextCallback()}
						>
							<Text style={formStyles.buttonText}>Next</Text>
						</TouchableOpacity>
					}

					{ currentPage == totalPages &&
						<TouchableOpacity
							style={formStyles.button}
							onPress={() => nextCallback()}
						>
							<Text style={formStyles.buttonText}>{submitButtonText}</Text>
						</TouchableOpacity>
					}
				</View>
			</View>
		</View>
	);
}

export default FormPaginator;
