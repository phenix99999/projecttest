import * as React from 'react';
import { TextInput } from 'react-native';
import { Text, View } from 'native-base';
import { useSelector } from 'react-redux';
import { MaskedTextInput } from 'react-native-mask-text';
import { useDispatch } from 'react-redux';
import {
    setPrenomField, setNomField, setNomReq, setPrenomReq, setReqCouriel,
    setAutreNomField, setActiveTab, setTelephoneLieuDeRecup, setTelephoneLieuDeDeces, setReqTelephoneTravail, setReqTelephoneMaison, setReqTelephoneCellulaire,
    setEtablissementDecesAddresse, setRefSujet,
    setEtablissementDecesProvince, setEtablissementDecesVille, setEtablissementDecesCodePostal, setEtablissementRecupAddresse, setEtablissementRecupProvince,
    setEtablissementRecupVille, setEtablissementRecupCodePostal,
    setRecord, setNumPrearangemnt, setNumTemprecup, setShowToastSujet, setNbSocket,
    setOpenPickerDoublonsModal, setDataDoublons, setRecordId, setErrorSocket, setRechercheDoublonsEtCreation,
    setAdresseTemp, setProvinceTemp, setVilleTemp, setCTemp, setTelTemp, setAdresseRecupTemp, setVilleRecupTemp, setProvRecupTemp, setCpRecupTemp
} from '../redux/reducer';
import { getPremierAvis } from '../functions/functionPremierAvis';
import { add, get } from '../utils/toadConnectorFileMaker';
import Toast, { BaseToast } from 'react-native-toast-message';

import { useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

import SyncStorage from 'sync-storage';
import { dateToFMDate } from '../utils/date';

const ChampDeTexte = (props) => {



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
            {props.label}{props.required ? <Text style={{ color: 'red' }}>*</Text> : null}
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
                    let adding = "";

                    if (props.label == "Prénom" && props.type == "suj") {
                        dispatch(setActiveTab(0));
                        if (prenom.length == 0) {
                            text = text.toUpperCase();
                        }

                        if (prenom.charAt(prenom.length - 1) == " ") {
                            text = text.substring(0, text.length - 1) + text.charAt(text.length - 1).toUpperCase();
                        }

                        dispatch(setPrenomField(text));
                    }
                }}
            />
        </View>
    </View>);

}

export default ChampDeTexte;