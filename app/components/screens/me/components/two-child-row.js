import * as React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../../../../assets/styles/me/twoChildRowStyles'

function TwoChildRow(props) {
  const {backgroundImage, rowTitle, uIElement, uiText, addText} = props;
  return (
    <View style={styles.rowWrapper}>
      <Text style={styles.rowText}>{rowTitle}</Text>
      <Image source={uIElement} style={styles.rightUI} />
      { uiText &&
        <View style={styles.end}>
          <Text style={styles.rowText2}>{uiText}</Text>
          <Text style={styles.add}>{addText}</Text>
        </View>
      }
    </View>
  );
}

export default TwoChildRow;
