import { Alert } from 'react-native';

export const formatPrice = (price) => {
  if(price == '') {
    return '0.00';
  }
  
  price = (Math.round(price * 100) / 100).toFixed(2);

  if(price == '0.00') {
    return '0.00';
  }

  return price
}

export const displayablePrice = (price) => {
  return '£'  + formatPrice((price / 100));
}

export const validatePrice = (value) => {
  if (isNaN(value)) {
      Alert.alert( 'Numeric value required.' );
      return '0.00';
  }

  return formatPrice(value);
}

export const validateInteger = (value) => {
  if (isNaN(value) || value % 1 !== 0) {
      Alert.alert( 'Integer value required.' );
      return '';
  }

  return value
}

export const reverseDate = (date) => {
    var spliter = date.split('-');
    return spliter[2] + '-' + spliter[1] + '-' + spliter[0];
}

export const parseTime = (time) => {
    // parse H:i:s to H:i
    var spliter = time.split(':');
    return spliter[0] + ':' + spliter[1];
}

export const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}