import * as Crypto from 'expo-crypto';
import moment from 'moment-timezone';
import base64 from 'react-native-base64';
import SyncStorage from 'sync-storage';

function ascii_to_hexa(str) {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}

export async function getToken(credential = null) {

  let now = moment.tz('UTC');

  let year = now.year().toString();
  let month = now.month() + 1;
  let day = now.date().toString();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  let dateConcat = year + month + day;
  let nowHours = now.format('HH');
  let nameKey = 'TelephoneMobileFmUserPassword';

  // let nameKey = "TelephoneMobile";

  let vhmCle = nameKey + dateConcat.toString() + nowHours.toString();

  let shaCle = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    vhmCle
  );

  let vhmToken = nameKey + nowHours.toString() + dateConcat.toString();

  let shaToken = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    vhmToken
  );

  let heureInverser = inverser(nowHours);
  let dayInverser = inverser(day);

  let newVhmCle =
    shaCle.substring(0, shaCle.length - parseInt(nowHours)) +
    heureInverser.toString() +
    shaCle.substring(shaCle.length - parseInt(nowHours), shaCle.length);
  let newVhmToken =
    shaToken.substring(0, parseInt(nowHours)) +
    dayInverser +
    shaToken.substring(parseInt(nowHours), shaToken.length);
  let userPassword =
    SyncStorage.get('username') + '|' + SyncStorage.get('password');

  if (credential != null) {
    userPassword = credential;
  }


  let base64Msg = base64.encode(userPassword);

  let vhmBd = ascii_to_hexa(base64Msg);
  console.log("User password : " + userPassword + " VHM BD : " + vhmBd);
  return {
    'Content-Type': 'application/json',
    VHMBd: vhmBd,
    VHMCle: newVhmCle.toUpperCase(),
    VHMToken: newVhmToken.toUpperCase(),
    VHMNomCompte: nameKey,
  };
}

export function inverser(twodigits: string) {
  return twodigits.substring(1, 2) + twodigits.substring(0, 1);
}
