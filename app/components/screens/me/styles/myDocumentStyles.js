import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#4d4d4d',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		height: '100%',
	},
	titleTxt: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
		marginBottom: 15,
    // backgroundColor: 'pink',
  },
	container: {
    display: 'flex',
		flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
		width: '100%',
		padding: 12,
  },
  pdf: {
    flex:1,
    width:'100%',
    height:'100%',
  },
	invoice: {
		padding: 10,
		borderWidth: 2,
		margin: 4,
		textAlign: 'center',
		backgroundColor:'#e6e6e6',
		borderColor:'#e6e6e6',
	},
	buttonWrapper: {
		flex: 1,
		backgroundColor: '#333333',
		height: '100%',
		padding: 7,
		alignItems: 'center',
		margin: 5,
		paddingTop: 11,
		marginTop: 0,
	},
	buttonWrapper2: {
		flex: 1,
		backgroundColor: '#333333',
		height: '100%',
		padding: 7,
		alignItems: 'center',
		margin: 5,
		paddingTop: 11,
		marginTop: 0,
		top: -10,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},

})

export default styles
