import * as React from 'react';
import { TextInput, Modal, TouchableOpacity } from 'react-native';
import { Text, View, Header, Left, Icon, Body, Right } from 'native-base';
import { useSelector } from 'react-redux';
import { MaskedTextInput } from 'react-native-mask-text';
import { useDispatch } from 'react-redux';

import { getPremierAvis } from '../functions/functionPremierAvis';

import Toast, { BaseToast } from 'react-native-toast-message';

import ChampDeTexte from './ChampDeTexte';
import PickerWithSearch from './Picker';

import CountryPicker from 'react-native-country-picker-modal'
import { useNavigation } from '@react-navigation/native';

import SyncStorage from 'sync-storage';
import { dateToFMDate } from '../utils/date';

import {
    setCodePaysDeces,
    setPaysDeces,
    setPaysRecuperation,
    setCodePaysRecuperation,

} from '../redux/reducer';


const ModalAddresse = (props) => {
    const dispatch = useDispatch();
    let visible = false;
    const openRecupAddressModal = useSelector(state => state.openRecupAddressModal);
    const openDecesAddressModal = useSelector(state => state.openDecesAddressModal);
    const etablissementDecesProvince = useSelector(state => state.etablissementDecesProvince);
    const etablissementRecupProvince = useSelector(state => state.etablissementRecupProvince);


    const paysDecesCode = useSelector(state => state.paysDecesCode);

    const paysRecuperationCode = useSelector(state => state.paysRecuperationCode);

    const telephoneLieuDeces = useSelector(state => state.telephoneLieuDeces);
    const isFrench = useSelector(state => state.isFrench);

    //SUJ_Deces_Adresse_Pays

    const provinceList = useSelector(state => state.provinceList);
    if (props.label == "Lieu de récupération") {
        visible = openRecupAddressModal;
    } else {
        visible = openDecesAddressModal;
    }

    const onSelectPays = (country: Country) => {
        if (props.label == "Lieu de décès") {
            dispatch(setCodePaysDeces(country.cca2));
            dispatch(setPaysDeces(country.name));
        } else {
            dispatch(setPaysRecuperation(country.name));
            dispatch(setCodePaysRecuperation(country.cca2));
        }
        // setCountryCode(country.cca2)
        // setCountry(country)
    }


    return (
        <View>
            <Modal
                animationType="slide"
                visible={visible}
            >
                <Header
                    noShadow={true}
                    style={{
                        borderBottomWidth: 0, backgroundColor: '#292016'
                    }}
                ><Left><TouchableOpacity onPress={() => {

                    props.closeModal();
                }
                }><Icon type="MaterialIcons" name="arrow-back" style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }} /></TouchableOpacity></Left>
                    <Body style={{ flex: 1.75 }}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{props.label}</Text>
                    </Body>
                    <Right>


                    </Right>
                </Header>

                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                    <Text style={{ marginTop: 10, marginLeft: 15, marginBottom: 8, color: props.error ? 'red' : '#06131c' }}>
                        {isFrench ? "Pays de décès" : "Country of death"}

                    </Text>

                    <View style={{
                        marginLeft: 'auto', marginTop: 2, backgroundColor: 'transparent', width: 170, padding: 5, height: 35,
                        marginRight: 15,
                        borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        borderColor: props.error ? 'red' : 'transparent'
                    }}>

                        {props.label == "Lieu de décès" ?
                            <View>
                                <CountryPicker
                                    countryCode={paysDecesCode}
                                    withFilter={false}
                                    withCountryNameTouchableOpacity={true}
                                    onSelect={onSelectPays}
                                    translation={'fra'}
                                    withAlphaFilter={true}
                                />
                            </View>
                            :
                            <View>
                                <CountryPicker
                                    countryCode={paysRecuperationCode}
                                    withFilter={false}
                                    withCountryNameTouchableOpacity={true}
                                    onSelect={onSelectPays}
                                    translation={'fra'}
                                    withAlphaFilter={true}
                                />

                            </View>
                        }
                    </View>
                </View>

                <ChampDeTexte label={'Addresse'} labelEn={'Address'} type={props.label} locked={props.locked} value={props.addresse} error={false} />
                <ChampDeTexte label={'Ville'} labelEn={'City'} type={props.label} locked={props.locked} value={props.ville} error={false} />

                {props.label == "Lieu de décès" ?
                    <PickerWithSearch label={"Province"} labelEn={'Province'} value={etablissementDecesProvince.length == 0 ? "Remplir" : etablissementDecesProvince} locked={props.locked} values={provinceList} />
                    :
                    <PickerWithSearch label={"Province"} labelEn={'Province'} value={etablissementRecupProvince.length == 0 ? "Remplir" : etablissementRecupProvince} locked={props.locked} values={provinceList} />
                }
                <ChampDeTexte label={'Code Postal'} labelEn={'Postal Code'} type={props.label} locked={props.locked} value={props.codePostal} error={false} />
            </Modal>
        </View>
    );
}



export default ModalAddresse;