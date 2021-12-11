import * as React from 'react';
import { StyleSheet, SafeAreaView, FlatList, ScrollView, Keyboard, TouchableOpacity, TextInput, Modal, ShadowPropTypesIOS, Dimensions, Alert, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AvisStackParamList, DossierStackParamList } from '../types'
import { Left, Right, Icon, Body, Container, Header, Tabs, Tab, Input, Form, Content, ScrollableTab, Text, Title, List, Picker, ListItem, View, Spinner } from 'native-base'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { chercherPkIdDeConseiller } from '../functions/functionPremierAvis';

type NavProps = StackScreenProps<DossierStackParamList, 'DossierList'>
import { useFocusEffect } from '@react-navigation/native';
import SyncStorage from 'sync-storage';
import { dateToFMDate, dateToFrench } from "../utils/date";
import { setARemettre, setBien, setOpenPickerARemettre, setOpenPickerBien, setOpenPickerTypeDeBien, setOpenPickerEmplacementGoTracking2, setEmplacementGoTracking2, setEmplacementGoTracking, setOpenPickerEmplacementGoTracking, setOpenPickerStatut, setOpenPickerPeriode, setPeriode, setStatut, setTypeAjoutDeBien, } from '../redux/reducerGoTracking';

const PickerGoTracking = (props: { title?: string }) => {
    const dispatch = useDispatch();
    let visible;
    const openPickerTypeDeBien = useSelector(state => state.openPickerTypeDeBien);
    const openPickerBien = useSelector(state => state.openPickerBien);
    const openPickerARemettre = useSelector(state => state.openPickerARemettre);
    const typeAjoutDeBien = useSelector(state => state.typeAjoutDeBien);
    const openPickerEmplacementGoTracking = useSelector(state => state.openPickerEmplacementGoTracking);
    const openPickerEmplacementGoTracking2 = useSelector(state => state.openPickerEmplacementGoTracking2);
    const openPickerPeriode = useSelector(state => state.openPickerPeriode);
    const openPickerStatut = useSelector(state => state.openPickerStatut);

    if (props.label == "Type de bien") {
        visible = openPickerTypeDeBien;
    } else if (props.label == "Bien") {
        visible = openPickerBien;
    } else if (props.label == "À remettre") {
        visible = openPickerARemettre;
    } else if (props.label == "Lieu") {
        visible = openPickerEmplacementGoTracking;
    } else if (props.label == "Morgue") {
        visible = openPickerEmplacementGoTracking2;
    } else if (props.label == "Période") {
        visible = openPickerPeriode;
    } else if (props.label == "Statut" && props.type == "gotrack") {
        visible = openPickerStatut;
    }



    let values = [];
    values = props.values;

    return (
        <View>
            <Modal
                animationType="slide"
                visible={visible}
            >
                <Header
                    style={{
                        backgroundColor: '#292016',
                    }}
                >
                    <Left><TouchableOpacity onPress={() => {
                        openPicker(false);
                    }}><Icon type="MaterialIcons" name="arrow-back" style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }} /></TouchableOpacity></Left>
                    <Body style={{ flex: 1.75 }}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{props.label}</Text>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <ScrollView>

                    {values.map((value, i) => (
                        < TouchableOpacity
                            key={i}
                            style={{ flexDirection: 'row', padding: 10, marginLeft: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 1 }}
                            onPress={() => {


                                if (props.label == "Type de bien" && typeAjoutDeBien != value) {
                                    dispatch(setTypeAjoutDeBien(value));
                                    dispatch(setBien(""));
                                } else if (props.label == "Bien") {
                                    dispatch(setBien(value));
                                } else if (props.label == "À remettre") {
                                    dispatch(setARemettre(value));
                                } else if (props.label == "Lieu") {
                                    dispatch(setEmplacementGoTracking(value));
                                } else if (props.label == "Morgue") {
                                    dispatch(setEmplacementGoTracking2(value));
                                } else if (props.label == "Période") {
                                    dispatch(setPeriode(value));
                                } else if (props.label == "Statut" && props.type == "gotrack") {
                                    dispatch(setStatut(value));
                                }
                                openPicker(false);

                            }}
                        >



                            <Text style={{ fontSize: 16, color: props.value == value ? '#0091ff' : 'black' }}>{props.label != "Lieu de décès" && props.label != "Lieu de récupération" || props.type == "vetement" ? value : value.split("~")[1]}</Text>


                            {props.value === value ? <View style={{ marginLeft: 'auto', marginRight: 15, alignSelf: 'center' }}>
                                <Icon name="check" type="AntDesign" style={{ color: '#0091ff', fontSize: 16 }} />
                            </View> : null}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </Modal>
            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <Text style={{ marginTop: 8, marginLeft: 15, width: '55%', color: 'white' }}>
                    {props.label}
                </Text>

                <TouchableOpacity onPress={() => {

                    openPicker(true);

                }} style={props.error ? styles.TouchableOpacityChooseError : styles.TouchableOpacityChoose}>
                    <Text style={{ marginLeft: 7, marginRight: 7, marginTop: 3, marginBottom: 7, opacity: 1, fontSize: Platform.OS == 'ios' ? 16 : 14, top: 5, color: "#06131c" }}>
                        {props.value}
                    </Text>
                </TouchableOpacity>
            </View>

        </View >
    );

    function openPicker(open) {
        if (props.label == "Type de bien") {
            dispatch(setOpenPickerTypeDeBien(open));
        } else if (props.label == "Bien") {
            dispatch(setOpenPickerBien(open));
        } else if (props.label == "À remettre") {
            dispatch(setOpenPickerARemettre(open));
        } else if (props.label == "Lieu") {
            dispatch(setOpenPickerEmplacementGoTracking(open));
        } else if (props.label == "Morgue") {
            dispatch(setOpenPickerEmplacementGoTracking2(open));
        } else if (props.label == "Statut" && props.type == "gotrack") {
            dispatch(setOpenPickerStatut(open));
        } else if (props.label == "Période") {
            dispatch(setOpenPickerPeriode(open));
        }
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nextTouchableOpacity: {
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: 30,
        backgroundColor: 'transparent',
        width: 100,
        justifyContent: 'center',
    },

    nextTouchableOpacityText: {
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: 30,
        backgroundColor: 'white',
        // width: 200,
        justifyContent: 'center',
    },

    submitTouchableOpacity: {
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: 30,
        backgroundColor: 'rgb(40,160,200)'
    },
    tabBarUnderline: {
        backgroundColor: '#F48130'
    },
    tab: {
    },
    activeTab: {
    },
    tabText: {
        color: '#F48130',
    },
    activeTabText: {
        color: 'black'

    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: 14,
        marginTop: 20
    },

    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    searchBox: {
        height: 70,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },

    grosTouchableOpacity: {
        marginLeft: 'auto', marginRight: 15, marginTop: 10, height: 35, borderColor: '#06131c'
    },
    TouchableOpacityDateChoose: {
        height: 35, borderColor: '#06131c', fontSize: 16, alignItems: 'center', textAlign: 'center', borderWidth: 1, flex: 1, borderRadius: 1,
    },
    TouchableOpacityChoose: {
        marginLeft: 'auto', marginRight: 15, minWidth: 30, height: 35, maxHeight: 35, borderColor: 'black', borderWidth: 1, maxWidth: '45%', backgroundColor: 'white', borderRadius: 5,

    },
    TouchableOpacityChooseError: {
        marginLeft: 'auto', marginRight: 15, minWidth: 30, height: 35, maxHeight: 35, borderColor: 'red', borderWidth: 1, maxWidth: '50%', backgroundColor: 'white', borderRadius: 5,
    },


    TouchableOpacityGenerer: {
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: 30,
        backgroundColor: '#F48130',
        width: 200,
        justifyContent: 'center',
    },

});


export default PickerGoTracking;
