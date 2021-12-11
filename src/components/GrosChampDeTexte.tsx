import * as React from 'react';
import { useRef } from 'react';
import { Input, View, Text } from 'native-base'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    setRemarques,
    setActiveTab, setNoteRecuperation, setVetementLieuRecuperation, setAnnulationRaison,
} from '../redux/reducer';


const GrosChampDeTexte = (props) => {

    const scrollRefRecup = useSelector(state => state.scrollRefRecup);
    const scrollRefMaladie = useSelector(state => state.scrollRefMaladie);
    const scrollRefRdv = useSelector(state => state.scrollRefRdv);
    const isFrench = useSelector(state => state.isFrench);
    const dispatch = useDispatch();
    let keyboardType = "default";
    if (props.keyboardType) {
        keyboardType = props.keyboardType;
    }
    const activeTab = useSelector(state => state.activeTab);

    const textLieuVetement = useSelector(state => state.vetementLieuRecuperation);
    return (
        <View>
            {props.type == "note" ?
                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                    <Text style={{ marginTop: 10, marginLeft: 15, marginBottom: 8, color: '#06131c' }}>
                        {isFrench ? props.label : props.labelEn}{props.required ? <Text style={{ color: 'red' }}>*</Text> : null}
                    </Text>
                </View>
                : null
            }

            {props.type == "vetement" ?

                <View style={{ padding: 5, marginLeft: 15, marginRight: 15, flexDirection: 'row', backgroundColor: '#eee', marginBottom: 12, marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
                    <Input
                        style={{ minHeight: 55, maxHeight: 150, backgroundColor: '#EEE' }}
                        multiline={true}
                        onTouchStart={() => {



                            scrollRefRecup.scrollTo({
                                y: 500,
                                animated: true,
                            })


                        }}

                        onChangeText={(text) => {

                            if (props.locked()) {
                                return;
                            }

                            dispatch(setVetementLieuRecuperation(text));
                        }
                        }
                        value={props.value}
                    />
                </View>

                :

                <View style={{ padding: 5, marginLeft: 15, marginRight: 15, flexDirection: 'row', backgroundColor: '#eee', marginBottom: 12, marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
                    <Input
                        style={{ backgroundColor: '#EEE', minHeight: 55, maxHeight: 150 }}
                        multiline={true}
                        value={props.value}
                        onTouchStart={() => {

                            if (props.label == "Notes (provenant de la fiche d'établissement)") {
                                scrollRefRecup.scrollTo({
                                    y: 150,
                                    animated: true,
                                })
                            }
                            if (props.type == "remarque" && activeTab == 5) {
                                scrollRefRdv.scrollTo({
                                    y: 200,
                                    animated: true,
                                })
                            }
                            else if (props.type == "remarque" && activeTab == 4) {
                                scrollRefMaladie.scrollTo({
                                    y: 5000,
                                    animated: true,
                                })
                            }

                        }}

                        onChangeText={(text) => {
                            if (props.locked()) {
                                return;
                            }

                            if (props.type == "note") {
                                dispatch(setNoteRecuperation(text))
                            } else if (props.type == "remarque") {

                                dispatch(setRemarques(text));
                                dispatch(setActiveTab(activeTab));
                            } else if (props.label == "Raison") {
                                dispatch(setAnnulationRaison(text));
                            }
                        }
                        }
                    />
                </View>
            }
        </View>);

};

export default GrosChampDeTexte;