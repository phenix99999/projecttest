
import * as React from 'react';
import { TouchableOpacity, Alert, Image, Platform, } from 'react-native';
import { Icon, Text, View, } from 'native-base'

import { useSelector } from 'react-redux';
import { MaskedTextInput } from 'react-native-mask-text';
import { useDispatch } from 'react-redux';
import {
    setOpenPickerDateDeDeces, setOpenPickerDateDeNaissance,
    setNas, setEtablissementDecesNom, setEtablissementDecesNo, setActiveTab, setParQuiVetement, setMaladieStatut, setOpenSuccursalePicker,
    setEtablissementRecupNo, setOpenVetementStatusPicker, setVetementHeureRecup,
    setOpenPickerLieuDeRecup, setOpenLieuRecupVetement, setOpenPickerDateRecupVetement, setOpenPickerTimeRecupVetement,
    setOpenPickerMaladieStatut, setOpenPickerDateRv, setOpenPickerHeureeRv, setOpenDatePickerGraphique, setDateForModeHebdoEtQuotidienGraphique, setDateForModeHebdoEtQuotidienGraphiqueText
} from '../redux/reducer';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { dateToFrench } from '../utils/date';


const ShowDatePicker = (props: { title?: string }) => {
    const dispatch = useDispatch();
    const openPickerDateDeNaissance = useSelector(state => state.openPickerDateDeNaissance);
    const openPickerDateDeDeces = useSelector(state => state.openPickerDateDeDeces);
    const openPickerDateRecup = useSelector(state => state.openPickerDateRecupVetement);
    const openPickerTimeRecup = useSelector(state => state.openPickerTimeRecupVetement);
    const openDatePickerGraphique = useSelector(state => state.openDatePickerGraphique);
    const openPickerDateRv = useSelector(state => state.openPickerDateRv);
    const openPickerTimeRv = useSelector(state => state.openPickerTimeRv);
    const dateRecupVetement = useSelector(state => state.dateRecupVetement);
    const dateRv = useSelector(state => state.dateRv);
    const dateDeNaissance = useSelector(state => state.dateDeNaissance);
    const dateDeDeces = useSelector(state => state.dateDeDeces);
    const dateRecupVetementText = useSelector(state => state.dateRecupVetementText);
    const prenom = useSelector(state => state.prenom);
    const nom = useSelector(state => state.nom);
    const isFrench = useSelector(state => state.isFrench);
    let visible;
    let date;

    const handlerChange = (date) => {
        let data = [];
        if (props.label == "Date de naissance") {

            // dispatch(setDateDeNaissance(date));
            openDatePicker(false, date);

        } else if (props.label == "Date de décès") {
            //  dispatch(setDateDeDeces(date));
            openDatePicker(false, date);
        } else if (props.label == "Date" && props.type == "recup") {
            //   dispatch(setVetementDateRecup(date));
            openDatePicker(false, date);
            dispatch(setActiveTab(2));

        } else if (props.label == "Heure" && props.type == "recup") {
            dispatch(setVetementHeureRecup(date));
            dispatch(setActiveTab(2));
            openDatePicker(false);
        } else if (props.label == "Date" && props.type == "rv") {
            // dispatch(setRvDate(date));
            dispatch(setActiveTab(5));
            openDatePicker(false, date);
        } else if (props.label == "Heure" && props.type == "rv") {
            // dispatch(setRvTime(date));
            dispatch(setActiveTab(5));
            openDatePicker(false);
        } else if (props.label == "Date" && props.type == "graph") {

            dispatch(setDateForModeHebdoEtQuotidienGraphique(date));
            dispatch(setDateForModeHebdoEtQuotidienGraphiqueText(dateToFrench(date)));
            openDatePicker(false);
        }


    }

    const setDateDefaut = () => {
        date = new Date('01/01/1900');

        if (prenom.length == 0) {
            Alert.alert(
                "Attention",
                "Vous devez entrer le prénom pour pouvoir changer la date de naissance.",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },

                ]
            );
        } else if (nom.length == 0) {
            Alert.alert(
                "Attention",
                "Vous devez entrer le nom pour pouvoir changer la date de naissance.",
                [
                    {
                        text: "Ok",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
        }
        else if (prenom.length > 0 && nom.length > 0) {
            openDatePicker(false, date);
        }


    }

    if (props.label == "Date de naissance" && prenom.length > 0 && nom.length > 0) {
        visible = openPickerDateDeNaissance;
        date = dateDeNaissance;
        if (dateDeNaissance.length == 0) {
            date = new Date();
        }
    } else if (props.label == "Date de décès") {
        visible = openPickerDateDeDeces;
        date = dateDeDeces;
        if (dateDeDeces.length == 0) {
            date = new Date();
        }
    } else if (props.label == "Date" && props.type == "recup") {
        visible = openPickerDateRecup;
        date = dateRecupVetement;
        if (dateRecupVetement.length == 0) {
            date = new Date();
        }
    } else if (props.label == "Heure" && props.type == "recup") {
        visible = openPickerTimeRecup;
    } else if (props.label == "Date" && props.type == "rv") {
        visible = openPickerDateRv;
        date = dateRv;
        if (dateRv.length == 0) {
            date = new Date();
        }
    } else if (props.label == "Heure" && props.type == "rv") {
        visible = openPickerTimeRv;
    } else if (props.label == "Date" && props.type == "graph") {
        visible = openDatePickerGraphique;
    }



    return (
        <View style={{ flexDirection: 'row', borderBottomColor: '#e2e2e2', marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 10, marginLeft: 15, color: props.textColor, width: '60%' }}>
                    {isFrench ? props.label : props.labelEn}{props.required ? <Text style={{ color: 'red' }}>*</Text> : null}
                </Text>
                {props.label == "Date de naissance" ?
                    <TouchableOpacity onPress={() => {
                        if (!props.locked()) {
                            setDateDefaut();
                        }

                    }} style={{ marginTop: 1, borderWidth: 1, height: 35, marginRight: '15%', justifyContent: 'center', padding: 5 }}>
                        <Icon type="Fontisto" name="date" style={{ alignSelf: 'center', color: '#06131c', fontSize: 20 }} /></TouchableOpacity> : null}
            </View>

            <TouchableOpacity bordered onPress={() => {

                if (props.label == "Date de naissance" && prenom.length == 0) {
                    Alert.alert(
                        "Attention",
                        "Vous devez entrer le prénom pour pouvoir changer la date de naissance.",
                        [
                            {
                                text: "Ok",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },

                        ]
                    );
                } else if (props.label == "Date de naissance" && nom.length == 0) {
                    Alert.alert(
                        "Attention",
                        "Vous devez entrer le nom pour pouvoir changer la date de naissance.",
                        [
                            {
                                text: "Ok",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                        ]
                    );
                } else if (props.unlocked || !props.locked()) {
                    openDatePicker(true);
                }

            }} small style={props.btnStyle} >
                <Text style={{ marginLeft: 7, marginRight: 7, marginTop: 3, marginBottom: 7, opacity: 1, fontSize: Platform.OS == 'ios' ? 16 : 14, top: 5, color: props.error ? 'red' : "#06131c" }}>
                    {props.textTouchableOpacity}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                date={date}
                mode={props.mode}
                headerTextIOS={isFrench ? props.mode == 'date' ? 'Choisir une date' : 'Choisir une heure' : props.mode == 'date' ? 'Choose a date' : 'Choose a time'}
                cancelTextIOS={isFrench ? 'Annuler' : 'Cancel'}
                confirmTextIOS={isFrench ? 'Confirmer' : 'Confirm'}
                isVisible={visible}
                locale="fr"
                onConfirm={async (date) => {
                    handlerChange(date)
                }}
                onCancel={() => {
                    openDatePicker(false);
                }}
            />
        </View>
    );

    function openDatePicker(open, date = null) {
        let dateObj = {};
        dateObj['open'] = open;
        dateObj['date'] = date;
        if (props.label == "Date de naissance") {
            dispatch(setOpenPickerDateDeNaissance(dateObj));
        } else if (props.label == "Date de décès") {
            dispatch(setOpenPickerDateDeDeces(dateObj));
        } else if (props.label == "Date" && props.type == "recup") {
            dispatch(setOpenPickerDateRecupVetement(dateObj));
        } else if (props.label == "Heure" && props.type == "recup") {
            dispatch(setOpenPickerTimeRecupVetement(open));
        } else if (props.label == "Date" && props.type == "rv") {
            dispatch(setOpenPickerDateRv(dateObj));
        } else if (props.label == "Heure" && props.type == "rv") {
            dispatch(setOpenPickerHeureeRv(open));
        } else if (props.label == "Date" && props.type == "graph") {
            dispatch(setOpenDatePickerGraphique(open));
        }

    }
}

export default ShowDatePicker;