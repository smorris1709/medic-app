import * as React from 'react';
import {View, Text, Image} from 'react-native'
import styles from '../../assets/styles/layout/screen-header-styles'

function ScreenHeader(props) {

	const { height, bottomBorder, backgroundImage, title, rightContent } = props;

	return (
		<View style={[
			styles.wrapper,
			{
				height: height ? height : 70,
				borderBottomWidth: bottomBorder ? 2 : 0,
				borderBottomColor: bottomBorder ? '#e6e6e6' : '',
			}
		]}>

			{ backgroundImage &&
				<Image source={backgroundImage} style={styles.backgroundImage} />
			}

			<View style={styles.row}>
				{ !rightContent &&
					<Text style={styles.title}>{title}</Text>
				}

				{ rightContent &&
					<>
						<View style={styles.splitRowCell1}>
							<Text style={styles.title}>{title}</Text>
						</View>
						<View style={styles.splitRowCell2}>
							{rightContent}
						</View>
					</>
				}
			</View>

		</View>
	);
}

export default ScreenHeader;
