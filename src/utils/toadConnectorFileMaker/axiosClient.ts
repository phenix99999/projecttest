import _axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { logger } from 'react-native-logs';
import * as AxiosLogger from 'axios-logger';
import { getToken } from './authentication';
import * as Sentry from 'sentry-expo';

import * as Crypto from 'expo-crypto';
import moment from 'moment-timezone';
import base64 from 'react-native-base64';
import SyncStorage from 'sync-storage';




AxiosLogger.setGlobalConfig({
  logger: logger.createLogger().debug,
});

// Error codes to ignore in the validation logic
const fileMakerErrorCodesToIgnore = [
  401, // 401 simply means 'no result' for FileMaker. Nothing to do with HTTP 401
];

const validateResponse = (response: AxiosResponse) => {
  // Get the different possible kind of errors
  const fmErrorCode = Number(response.data?.fmresultset?.error?.code || '0');
  const resultatErreur = (response.data || {})['Resultat erreur'];
  const erreurVHMSOFT = (resultatErreur || {})['erreur VHMSOFT'];

  let error: Error | null = null;

  if (fmErrorCode && !fileMakerErrorCodesToIgnore.includes(fmErrorCode)) {
    error = Error(
      `FileMaker error ${response.data?.fmresultset?.error?.code} - ${response.data?.fmresultset?.error?.Message}`
    );
  }

  if (erreurVHMSOFT) {
    error = Error(
      `VHMSOFT error ${erreurVHMSOFT.code} - ${erreurVHMSOFT.Message}`
    );
  }

  if (resultatErreur) {
    error = Error(`FileMaker error ${JSON.stringify(resultatErreur)}`);
  }

  if (error) {
    Sentry.Native.captureException(error);
    throw error;
  }

  return response;
};

// Create and configure a new axios instance
const axios = _axios.create();
axiosRetry(axios, { retries: 3 });
// axios.interceptors.request.use(AxiosLogger.requestLogger);
axios.interceptors.response.use(validateResponse);

axios.interceptors.request.use(async (config) => {




  // const theHeader = await getToken();

  config.headers = {
    // ...theHeader,
    ...config.headers,
  };
  return config;
});

export default axios;
