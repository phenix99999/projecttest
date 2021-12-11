import axios from './axiosClient';
import { getToken } from './authentication';

import normalAxios from 'axios';
import * as Crypto from 'expo-crypto';
import moment from 'moment-timezone';
import base64 from 'react-native-base64';
import SyncStorage from 'sync-storage';
import * as Sentry from 'sentry-expo';


export async function get(server, protocol, data, filter) {


  let url = protocol + server + data + "?filter=" + JSON.stringify(filter);
  const res = await axios.get(url);
  console.log(res.data);
  return "allo";
}

