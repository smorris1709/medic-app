import * as React from 'react';
import { Text, View } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import styles from '../../../../assets/styles/me/rowPercentCircleStyles'

function RowPercentCircle(props) {
  const {rowTitle, uiText, addText, source} = props;
  return (
    <View style={[
        styles.rowWrapper,
        {
          paddingLeft: source == 'dashboard' ? 5 : 0,
          paddingRight: source == 'dashboard' ? 5 : 0,
          marginLeft: source == 'dashboard' ? 0 : 25,
          width: source == 'dashboard' ? '100%' : '55%',
        }
      ]}>
      
      <Text style={[styles.rowText, { width: source == 'dashboard' ? '70%' : '85%' }]}>{rowTitle}</Text>
      <View>
        <PercentageCircle
          radius={28}
          percent={uiText}
          color={'#008d36'}
          innerColor={'#4D4D4D'}
          borderWidth={4}>
          <Text style={styles.rowText2}>{uiText}</Text>
          <Text style={ (uiText == 100) ? styles.add2 : styles.add1}>%</Text>
        </PercentageCircle>
      </View>
    </View>
  );
}

export default RowPercentCircle;
