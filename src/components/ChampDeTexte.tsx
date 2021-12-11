import * as React from 'react';
import { TextInput } from 'react-native';
import { Text, View } from 'native-base';
import { useSelector } from 'react-redux';
import { MaskedTextInput } from 'react-native-mask-text';
import { useDispatch } from 'react-redux';
import {
    setItemId
} from '../redux/reducer';

import { add, get } from '../utils/toadConnectorFileMaker';
import Toast, { BaseToast } from 'react-native-toast-message';

import { useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

import SyncStorage from 'sync-storage';
import { dateToFMDate } from '../utils/date';

const ChampDeTexte = (props) => {
    const telephoneLieuDeces = useSelector(state => state.telephoneLieuDeces);
    const telephoneLieuDeRecup = useSelector(state => state.telephoneLieuDeRecup);
    const isFrench = useSelector(state => state.isFrench);
    const dispatch = useDispatch();

    let keyboardType = "default";
    if (props.keyboardType) {
        keyboardType = props.keyboardType;
    }

    const reqTelephoneMaison = useSelector(state => state.reqTelephoneMaison);
    function onSearch(e) {

        //WebBrowser.openBrowserAsync('https://www.1177.se/Halland/Sok/?q=Diabetes&submitted=true');
    }

    let nbSocket = 0;


    return (<View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
        <Text style={{ marginTop: 10, marginLeft: 15, marginBottom: 8, color: props.error ? 'red' : '#06131c' }}>
            {isFrench ? props.label : props.labelEn}{props.required ? <Text style={{ color: 'red' }}>*</Text> : null}
        </Text>
        <View style={{ marginLeft: 'auto' }}>
            <TextInput
                style={{
                    marginTop: 2, backgroundColor: '#EEE', width: 170, padding: 5, height: 35, marginLeft: 15, marginRight: 15,
                    borderWidth: 1,
                    borderColor: props.error ? 'red' : 'transparent'
                }}
                keyboardType={props.keyboardType}
                value={props.value}
                onChangeText={async (text) => {

                    if (props.label == "Item #") {
                        dispatch(setItemId(text));
                    }

                }}
            />
        </View>
    </View>);

}

export default ChampDeTexte;