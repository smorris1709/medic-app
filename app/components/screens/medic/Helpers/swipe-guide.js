import * as React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../../../../assets/styles/medic/jobStyles'
import * as icons from '../../../../assets/icons'

const {leftSwipeArrow, rightSwipeArrow} = icons

function SwipeGuide() {

	const {swipeRight, swipeLeft, swipeArrowStyle, swipeTitleTxtRight, swipeRowWrapper, swipeTitleTxt, greenRowWrapper, darkSwipeWrapper} = styles

	return (
		<View style={swipeRowWrapper}>
			<View style={darkSwipeWrapper}>
				<Image source={leftSwipeArrow} style={swipeArrowStyle}/>
				<Text style={swipeLeft}>Decline{"\n"}Position</Text>
			<Text style={swipeTitleTxt}>Swipe </Text>
			</View>
			<View style={greenRowWrapper}>
				<Text style={swipeTitleTxtRight}>Position</Text>
				<Text style={swipeRight}>Like{"\n"}Position</Text>
			<Image source={rightSwipeArrow} style={swipeArrowStyle}/>
			</View>
		</View>
	);
}

export default SwipeGuide;