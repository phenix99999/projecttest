import * as React from 'react';
import { StyleSheet, SafeAreaView, FlatList, ScrollView, Keyboard, TouchableOpacity, TextInput, Modal, ShadowPropTypesIOS, Dimensions, Alert, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AvisStackParamList, DossierStackParamList } from '../types'
import { Left, Right, Icon, Body, Container, Header, Tabs, Tab, Input, Form, Content, ScrollableTab, Text, Title, List, Picker, ListItem, View, Spinner } from 'native-base'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    setSexe, setReligion, setLienReq, setOpenPickerAvisSantePublique, setReqSexe, setOpenPickerReqSexe,
    setOpenPickerMapAssistance, setSujTypeNomMapAssistance, setTypeCasPresumer, setBioHazard, setAvisSantePublique,
    setOpenPickerTypeDeCas, setOpenPickerCommunaute, setCommunaute, setOpenPickerSexe, setOpenPickerReligion,
    setNas, setEtablissementDecesNom, setEtablissementDecesNo, setActiveTab, setParQuiVetement, setMaladieStatut, setOpenSuccursalePicker,
    setOpenPickerLieuDeDeces, setOpenBioHazardPicker, setOpenPickerCoronaVirus,
    setEtablissementRecupNo, setOpenVetementStatusPicker,
    setEtablissementRecupNom, setVetementStatus, setVetementLieuRecuperation, setOpenPickerParQui, setOpenTransportAutoriserPicker, setSuccursale,
    setOpenPickerLieuDeRecup, setOpenLieuRecupVetement, setOpenPickerConseiller, setConseillerRvNo, setConseillerRvNom, setLieuDeDeces, setLieuDeRecup
    , setSearchPicker, setOpenDecesAddresse, setOpenRecupAddresse, setEtablissementDecesAddresse, setEtablissementDecesProvince, setEtablissementDecesVille, setEtablissementDecesCodePostal, setEtablissementRecupAddresse, setEtablissementRecupProvince, setEtablissementRecupVille, setEtablissementRecupCodePostal
    , setOpenPickerMaladie, setMaladieName, setMaladieId, setNoSuccursale,
    setAnnulationFlag, setOpenPickerAnnulation, setAnnulationTimeStamp, setAnnulationUsager, setAutorisationTransport, setOpenPickerMaladieStatut,
    setOpenPickerLien, setCoronaVirus, setOpenPickerPeriode,
    setOpenPickerProvince, setNumeroChoisi, setAdresseTemp, setProvinceTemp, setTelephoneLieuDeDeces, setProvRecupTemp, setAnnulerOption,
    setErrorAnnulationRaison, setOpenPickerYearGraphique, setYearGraphique, setOpenPickerMonthGraphique, setMonthGraphique, setOpenPickerSemaine,
    setSemaineGraphique, setPeriode, setStatut, setOpenPickerStatut

} from '../redux/reducer';
import { chercherPkIdDeConseiller } from '../functions/functionPremierAvis';

type NavProps = StackScreenProps<DossierStackParamList, 'DossierList'>
import { useFocusEffect } from '@react-navigation/native';
import SyncStorage from 'sync-storage';
import { dateToFMDate, dateToFrench } from "../utils/date";

const PickerWithSearch = (props: { title?: string }) => {



    const dispatch = useDispatch();
    const activeTab = useSelector(state => state.activeTab);
    const conseillerList = useSelector(state => state.conseillerList);
    const typeCasPresumerNo = useSelector(state => state.typeCasPresumerNo);
    const openPickerWithSearchMapAssistance = useSelector(state => state.openPickerWithSearchMapAssistance);
    const openPickerWithSearchTypeDeCas = useSelector(state => state.openPickerWithSearchTypeDeCas);
    const openPickerWithSearchCommunaute = useSelector(state => state.openPickerWithSearchCommunaute);
    const openPickerWithSearchSexe = useSelector(state => state.openPickerWithSearchSexe);
    const openPickerWithSearchReligion = useSelector(state => state.openPickerWithSearchReligion);
    const openPickerLieuDeDeces = useSelector(state => state.openPickerLieuDeDeces);
    const openPickerLieuDeRecup = useSelector(state => state.openPickerLieuDeRecup);
    const openPickerVetementStatus = useSelector(state => state.openPickerVetementStatus);
    const openPickerAnnulation = useSelector(state => state.openPickerAnnulation);
    const openPickerVetementLieuRecuperation = useSelector(state => state.openPickerVetementLieuRecuperation);
    const openPickerParQuiRecup = useSelector(state => state.openPickerParQuiRecup);
    const openPickerTransportAutoriser = useSelector(state => state.openPickerTransportAutoriser);
    const openPickerBioHazard = useSelector(state => state.openPickerBioHazard);
    const openPickerMaladieStatus = useSelector(state => state.openPickerMaladieStatus);
    const openPickerAvisSantePublique = useSelector(state => state.openPickerAvisSantePublique);
    const openPickerSuccursale = useSelector(state => state.openPickerSuccursale);
    const openPickerCoronaVirus = useSelector(state => state.openPickerCoronaVirus);
    const openPickerConseiller = useSelector(state => state.openPickerConseiller);
    const openPickerProvince = useSelector(state => state.openPickerProvince);
    const openPickerMaladie = useSelector(state => state.openPickerMaladie);
    const openPickerLien = useSelector(state => state.openPickerLien);

    const etablissementRecupNo = useSelector(state => state.etablissementRecupNo);
    const maladieListStructure = useSelector(state => state.maladieListeStructurer);
    const succursaleListeInfo = useSelector(state => state.succursaleListeInfo);
    const succursaleListe = useSelector(state => state.succursaleListe);
    const searchText = useSelector(state => state.searchText);
    const idMaladie = useSelector(state => state.idMaladie);
    const etablissementDecesNo = useSelector(state => state.etablissementDecesNo);
    const listeEtablissementInfo = useSelector(state => state.listeEtablissementInfo);
    const listeEtablissementComplet = useSelector(state => state.listeEtablissementComplet);
    const succursaleListeForPicker = useSelector(state => state.succursaleListeForPicker);
    const openPickerSexeReq = useSelector(state => state.openPickerSexeReq);
    const openPickerYearGraphique = useSelector(state => state.openPickerYearGraphique);
    const openPickerMonthGraphique = useSelector(state => state.openPickerMonthGraphique);
    const isFrench = useSelector(state => state.isFrench);

    const openPickerEmplacementGoTracking = useSelector(state => state.openPickerEmplacementGoTracking);
    const openPickerEmplacementGoTracking2 = useSelector(state => state.openPickerEmplacementGoTracking2);

    const periode = useSelector(state => state.periode);
    const statut = useSelector(state => state.statut);

    const openPickerPeriode = useSelector(state => state.openPickerPeriode);
    const openPickerStatut = useSelector(state => state.openPickerStatut);


    // const etablissementRecupNo = useSelector(state => state.etablissementRecupNo);

    const annulationRaison = useSelector(state => state.annulationRaison);

    let visible;



    const adresseTemp = useSelector(state => state.adresseTemp);
    const provinceTemp = useSelector(state => state.provinceTemp);
    const villeTemp = useSelector(state => state.villeTemp);
    const cpTemp = useSelector(state => state.cpTemp);

    const adressRecupTemp = useSelector(state => state.adressRecupTemp);
    const villeRecupTemp = useSelector(state => state.villeRecupTemp);
    const provinceRecupTemp = useSelector(state => state.provinceRecupTemp);
    const cpRecupTemp = useSelector(state => state.cpRecupTemp);

    const etablissementDecesAddresse = useSelector(state => state.etablissementDecesAddresse);
    const etablissementDecesVille = useSelector(state => state.etablissementDecesVille);
    const etablissementDecesCodePostal = useSelector(state => state.etablissementDecesCodePostal);
    const etablissementRecupAddresse = useSelector(state => state.etablissementRecupAddresse);
    const etablissementRecupProvince = useSelector(state => state.etablissementRecupProvince);
    const etablissementRecupVille = useSelector(state => state.etablissementRecupVille);
    const etablissementRecupCodePostal = useSelector(state => state.etablissementRecupCodePostal);
    const openPickerSemaine = useSelector(state => state.openPickerSemaine);






    function updateLieuWithValueInSelect(etablissementNo, type) {
        for (let i = 0; i < listeEtablissementInfo.length; i++) {
            if (listeEtablissementInfo[i].No_Etablissement_si_Centre_Hosp == etablissementNo) {
                let etablissementInfo = {};
                etablissementInfo.nom = listeEtablissementInfo[i].Nom_Etablissement_si_Centre_Hosp;
                etablissementInfo.no = listeEtablissementInfo[i].No_Etablissement_si_Centre_Hosp;
                etablissementInfo.adresse = listeEtablissementInfo[i].Adresse_No_Rue_App;
                etablissementInfo.province = listeEtablissementInfo[i].Adresse_Province;
                etablissementInfo.ville = listeEtablissementInfo[i].Adresse_Ville;
                etablissementInfo.codePostal = listeEtablissementInfo[i].Adresse_CodePostal;
                etablissementInfo.telephone = listeEtablissementInfo[i].Telephone1;
                if (type == "deces") {
                    dispatch(setLieuDeDeces(etablissementInfo));
                    if (!etablissementRecupNo) { // on veut copier seulement dans le cas qui a rien dans le lieu de recup
                        dispatch(setLieuDeRecup(etablissementInfo));
                    }
                } else {
                    dispatch(setLieuDeRecup(etablissementInfo));
                }
                break;
            }
        }
    }
    function updateLieu(type, etablissementNo, etablissementNom) {


        if (etablissementNo == "900" || etablissementNo == "4817" || etablissementNom == 'Autre') {
            if (type == "deces") {

                dispatch(setEtablissementDecesAddresse(adresseTemp));
                dispatch(setEtablissementDecesProvince(provinceTemp));
                dispatch(setEtablissementDecesVille(villeTemp));
                dispatch(setEtablissementDecesCodePostal(cpTemp));

                dispatch(setEtablissementDecesNo(etablissementNo));
                dispatch(setEtablissementDecesNom(etablissementNom));

                if (etablissementRecupNo.length == 0) {
                    dispatch(setEtablissementRecupNo(etablissementNo));
                    dispatch(setEtablissementRecupNom(etablissementNom));
                    dispatch(setEtablissementRecupAddresse(adresseTemp));
                    dispatch(setEtablissementRecupProvince(provinceTemp));
                    dispatch(setEtablissementRecupVille(villeTemp));
                    dispatch(setEtablissementRecupCodePostal(cpTemp));
                }


                dispatch(setOpenDecesAddresse(true));
            } else if (type == 'recup') {
                if (etablissementRecupNo.length < 0) { //Faire la copie si on a rien dans la recuperation
                    dispatch(setEtablissementRecupAddresse(adresseTemp));
                    dispatch(setEtablissementRecupProvince(provinceTemp));
                    dispatch(setEtablissementRecupVille(villeTemp));
                    dispatch(setEtablissementRecupCodePostal(cpTemp));
                    dispatch(setEtablissementRecupNo(etablissementNo));
                    dispatch(setEtablissementRecupNom(etablissementNom));


                } else {
                    dispatch(setEtablissementRecupAddresse(adressRecupTemp));
                    dispatch(setEtablissementRecupProvince(etablissementRecupProvince));
                    dispatch(setEtablissementRecupVille(villeRecupTemp));
                    dispatch(setEtablissementRecupCodePostal(cpRecupTemp));

                    dispatch(setEtablissementRecupNom(etablissementNom));
                    dispatch(setEtablissementRecupNo(etablissementNo));


                }



                dispatch(setOpenRecupAddresse(true));
            }

        } else {
            updateLieuWithValueInSelect(etablissementNo, type);
        }
    }
    function chercherIdMaladieAvecNomMaladie(nomMaladie) {
        let idMaladie = "";
        for (let i = 0; i < maladieListStructure.length; i++) {
            if (maladieListStructure[i]['nom'].includes(nomMaladie)) {
                idMaladie = maladieListStructure[i]['Id'];
                break;
            }
        }

        return idMaladie;
    }

    function getSuccursaleIdWithName(name) {
        for (let i = 0; i < succursaleListeInfo.length; i++) {
            if (succursaleListeInfo[i].label == name) {
                return succursaleListeInfo[i].id;
            }
        }

        return "Remplir";
    }





    if (props.label == "Annuler") {
        visible = openPickerAnnulation;
    } else if (props.label == "MapAssistance") {
        visible = openPickerWithSearchMapAssistance;
    } else if (props.label == "Type de cas") {
        visible = openPickerWithSearchTypeDeCas;
    } else if (props.label == "Communauté") {
        visible = openPickerWithSearchCommunaute;
    } else if (props.label == "Sexe" && props.type == "req") {
        visible = openPickerSexeReq;
    } else if (props.label == "Sexe") {
        visible = openPickerWithSearchSexe;
    } else if (props.label == "Religion") {
        visible = openPickerWithSearchReligion;
    } else if (props.label == "Lieu de décès") {
        visible = openPickerLieuDeDeces;

    } else if (props.label == "Lieu de récupération") {
        if (props.type == "lieu") {
            visible = openPickerLieuDeRecup;
        } else {
            visible = openPickerVetementLieuRecuperation;
        }
    } else if (props.type == "vetement" && props.label == "Statut") {
        visible = openPickerVetementStatus;
    } else if (props.label == "Par qui") {
        visible = openPickerParQuiRecup;
    } else if (props.label == "Autorisation Transport") {
        visible = openPickerTransportAutoriser;
    } else if (props.label == "BIOHAZARD") {
        visible = openPickerBioHazard;
    } else if (props.label == "Statut" && props.type != "gotrack") {
        visible = openPickerMaladieStatus;
    } else if (props.label == "Avis santé publique") {
        visible = openPickerAvisSantePublique;
    } else if (props.label == "Succursale") {

        visible = openPickerSuccursale;
    } else if (props.label == "Conseiller") {
        visible = openPickerConseiller;
    } else if (props.label == "Maladie") {

        visible = openPickerMaladie;
    } else if (props.label == "CoronaVirus") {
        visible = openPickerCoronaVirus;
    } else if (props.label == "Province") {
        visible = openPickerProvince;
    } else if (props.label == "Lien") {
        visible = openPickerLien;
    } else if (props.label == "Année") {
        visible = openPickerYearGraphique;
    } else if (props.label == "Mois") {
        visible = openPickerMonthGraphique;
    } else if (props.label == "Semaine") {
        visible = openPickerSemaine;
    }
    let values = [];
    if (isFrench) {
        values = props.values;
    } else {
        values = props.valuesEn;
    }

    let newValues = [];
    let indexNewValues = 0;

    if (props.label == "Lieu de décès" || props.label == "Lieu de récupération") {
        values = listeEtablissementComplet;
    }
    if (props.label == "Succursale" || (props.label == "Lieu de récupération" && props.type != "lieu")) {
        values = succursaleListeForPicker;
    }

    if (searchText) {
        let searchNormalized = searchText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        let oneValueFromList = "";
        for (let i = 0; i < values.length; i++) {
            oneValueFromList = values[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

            if (oneValueFromList.includes(searchNormalized)) {
                newValues[indexNewValues] = values[i];
                indexNewValues++;
            }
        }

        if (newValues.length > 0) {
            values = newValues;
        }

        if (searchText.length == 0) {
            values = props.values;
        }

    }
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
                        dispatch(setSearchPicker(""));
                        openPicker(false);
                    }}><Icon type="MaterialIcons" name="arrow-back" style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }} /></TouchableOpacity></Left>
                    <Body style={{ flex: 1.75 }}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{isFrench ? props.label : props.labelEn}</Text>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        {props.search ?
                            <TextInput
                                style={{
                                    marginTop: 2, backgroundColor: '#EEE', padding: 5, width: Dimensions.get('window').width - 40, height: 35, marginLeft: 20, marginRight: 20,
                                    borderWidth: 1,
                                    borderColor: 'transparent'
                                }}
                                placeholder={isFrench ? 'Chercher' : 'Search'}
                                value={searchText}
                                onChangeText={(text) => {
                                    dispatch(setSearchPicker(text));
                                }}

                            />

                            : null}
                        <View style={{ borderBottomColor: '#e2e2e2', borderBottomWidth: 1 }} />

                    </View>

                    {values.map((value, i) => (
                        < TouchableOpacity
                            key={i}
                            style={{ flexDirection: 'row', padding: 10, marginLeft: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 1 }}
                            onPress={() => {
                                dispatch(setSearchPicker(""));


                                if (props.label == "Annuler") {
                                    dispatch(setAnnulerOption(value))
                                    if (value == "Oui" || value == "Yes") {
                                        let actualTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
                                        dispatch(setAnnulationFlag("1"));
                                        let dateString = dateToFMDate(new Date()) + " " + actualTime;
                                        dispatch(setAnnulationTimeStamp(dateString));
                                        dispatch(setAnnulationUsager(SyncStorage.get('username')));

                                        if (annulationRaison.length > 0) {
                                            dispatch(setErrorAnnulationRaison(false));
                                        }
                                    }
                                    if (value == "Non" || value == "No") {
                                        dispatch(setAnnulationFlag(""));
                                        dispatch(setAnnulationTimeStamp(""));
                                        dispatch(setAnnulationUsager(""));
                                        dispatch(setErrorAnnulationRaison(false));
                                    }
                                } else if (props.label == "MapAssistance") {
                                    dispatch(setSujTypeNomMapAssistance(value));
                                } else if (props.label == "Type de cas") {
                                    dispatch(setTypeCasPresumer(value));
                                } else if (props.label == "Communauté") {
                                    dispatch(setCommunaute(value));
                                } else if (props.label == "Religion") {
                                    dispatch(setReligion(value));
                                } else if (props.label == "Sexe" && props.type == "req") {
                                    if (value != "Faites votre choix" && value != "Aucun") {
                                        dispatch(setReqSexe(value));
                                    }
                                    if (value == "Aucun") {
                                        dispatch(setReqSexe(""));
                                    }

                                } else if (props.label == "Sexe") {
                                    if (value != "None" && value != "Aucun") {
                                        dispatch(setSexe(value));
                                    }
                                    if (value == "Aucun" || value == "None") {
                                        dispatch(setSexe(""));
                                    }

                                } else if (props.type == "vetement" && props.label == "Statut") {
                                    dispatch(setVetementStatus(value));
                                } else if (props.label == "Par qui") {
                                    dispatch(setParQuiVetement(value));
                                } else if (props.label == "Autorisation Transport") {
                                    dispatch(setAutorisationTransport(value));
                                } else if (props.label == "BIOHAZARD") {
                                    dispatch(setBioHazard(value));
                                } else if (props.label == "Statut" && props.type != "gotrack") {

                                    dispatch(setMaladieStatut(value));
                                } else if (props.label == "Avis santé publique") {
                                    dispatch(setAvisSantePublique(value));
                                } else if (props.label == "Conseiller") {

                                    const pkIdConseiller = chercherPkIdDeConseiller(value, conseillerList);

                                    dispatch(setConseillerRvNo(pkIdConseiller));
                                    dispatch(setConseillerRvNom(value));
                                } else if (props.label == "Maladie") {


                                    let idMaladie = chercherIdMaladieAvecNomMaladie(value);

                                    dispatch(setMaladieName(value));
                                    dispatch(setMaladieId(idMaladie))

                                } else if (props.label == "Lieu de décès") {
                                    const etablissementNo = value.split("~")[0];
                                    const etablissementName = value.split("~")[1];
                                    updateLieu('deces', etablissementNo, etablissementName);
                                } else if (props.label == "Lieu de récupération") {
                                    if (props.type == "lieu") {
                                        const etablissementNo = value.split("~")[0];
                                        const etablissementName = value.split("~")[1];

                                        updateLieu('recup', etablissementNo, etablissementName);
                                    } else if (props.type == "vetement") {
                                        let vetementString = "";
                                        let succursaleTemp = {};
                                        for (let i = 0; i < succursaleListe.length; i++) {
                                            if (value == succursaleListe[i].Nom_Etablissement_si_Succ) {
                                                succursaleTemp = succursaleListe[i];
                                                break;
                                            }
                                        }

                                        vetementString = value + "\r\n" + succursaleTemp.Adresse_No_Rue_App + "\r\n" + succursaleTemp.Adresse_Ville + "," + succursaleTemp.Adresse_Province + "\r\n" + succursaleTemp.Adresse_CodePostal;
                                        dispatch(setVetementLieuRecuperation(vetementString));
                                    }
                                } else if (props.label == "Succursale") {
                                    dispatch(setNoSuccursale(getSuccursaleIdWithName(value)));
                                    dispatch(setSuccursale(value));
                                } else if (props.label == "CoronaVirus") {
                                    dispatch(setCoronaVirus(value));
                                    dispatch(setMaladieStatut(value));
                                    dispatch(setBioHazard(value));
                                    if (value == "Oui" || value == "Yes") {
                                        let idMaladie = chercherIdMaladieAvecNomMaladie("Covid-19");
                                        dispatch(setMaladieName("Covid-19"));
                                        dispatch(setMaladieId(idMaladie))

                                    } else {
                                        if (idMaladie == 12) {
                                            dispatch(setMaladieName(""));
                                            dispatch(setMaladieId(""))
                                        }
                                    }

                                } else if (props.label == "Province") {

                                    if (activeTab == 2) {
                                        dispatch(setProvRecupTemp(value))
                                        dispatch(setEtablissementRecupProvince(value));

                                    } else {
                                        dispatch(setEtablissementDecesProvince(value));
                                        dispatch(setProvinceTemp(value))
                                    }

                                } else if (props.label == "Lien") {
                                    dispatch(setLienReq(value));
                                } else if (props.label == "Année") {
                                    dispatch(setYearGraphique(value));
                                } else if (props.label == "Mois") {
                                    dispatch(setMonthGraphique(value));
                                } else if (props.label == "Semaine") {
                                    dispatch(setSemaineGraphique(value));
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
                <Text style={{ marginTop: 8, marginLeft: 15, width: '55%' }}>
                    <Text style={{ color: props.error ? 'red' : props.labelTextWhite ? 'white' : '#06131c' }}>
                        {props.label == "BIOHAZARD" ?
                            <Icon type="FontAwesome5" name="biohazard" style={{ fontSize: 20, color: props.error ? 'red' : 'black' }} /> : null}
                        {props.label == "BIOHAZARD" ? " " : null}{isFrench ? props.label : props.labelEn}{props.required ? <Text style={{ color: 'red' }}>*</Text> : null}</Text>
                </Text>
                <TouchableOpacity onPress={() => {

                    if (props.unlocked || !props.locked()) {
                        openPicker(true);
                    }

                }} style={props.error ? styles.TouchableOpacityChooseError : styles.TouchableOpacityChoose}>
                    <Text style={{ marginLeft: 7, marginRight: 7, marginTop: 3, marginBottom: 7, opacity: 1, fontSize: Platform.OS == 'ios' ? 16 : 14, top: 5, color: props.error ? 'red' : "#06131c" }}>
                        {props.value}
                    </Text>
                </TouchableOpacity>
            </View>

        </View >
    );

    function openPicker(open) {
        if (props.label == "Annuler") {
            dispatch(setOpenPickerAnnulation(open));
            dispatch(setActiveTab(7));
        } else if (props.label == "MapAssistance") {
            dispatch(setOpenPickerMapAssistance(open));
            dispatch(setActiveTab(0));
        } else if (props.label == "Type de cas") {
            if (typeCasPresumerNo.length == 0 && open) {
                dispatch(setTypeCasPresumer("26 - En attente"));
            }
            dispatch(setOpenPickerTypeDeCas(open));
            dispatch(setActiveTab(0));
        } else if (props.label == "Communauté") {
            dispatch(setOpenPickerCommunaute(open));
            dispatch(setActiveTab(0));
        } else if (props.label == "Sexe" && props.type == "req") {
            dispatch(setOpenPickerReqSexe(open));
            dispatch(setActiveTab(3));
        } else if (props.label == "Sexe") {
            dispatch(setOpenPickerSexe(open));
            dispatch(setActiveTab(0));
        }
        else if (props.label == "Religion") {
            dispatch(setOpenPickerReligion(open));
            dispatch(setActiveTab(0));
        } else if (props.label == "Lieu de décès") {
            dispatch(setOpenPickerLieuDeDeces(open));
            dispatch(setActiveTab(1));
        } else if (props.label == "Lieu de récupération") {
            if (props.type == "lieu") {
                dispatch(setOpenPickerLieuDeRecup(open));
                dispatch(setActiveTab(2));
            } else if (props.type == "vetement") {
                dispatch(setOpenLieuRecupVetement(open));
                dispatch(setActiveTab(2));
            }
        } else if (props.type == "vetement" && props.label == "Statut") {
            dispatch(setOpenVetementStatusPicker(open));
            dispatch(setActiveTab(2));
        } else if (props.label == "Par qui") {
            dispatch(setOpenPickerParQui(open));
            dispatch(setActiveTab(2));
        } else if (props.label == "Autorisation Transport") {
            dispatch(setOpenTransportAutoriserPicker(open));
            dispatch(setActiveTab(3));
        } else if (props.label == "BIOHAZARD") {
            dispatch(setOpenBioHazardPicker(open));
            dispatch(setActiveTab(4));
        } else if (props.label == "Statut" && props.type != "gotrack") {
            dispatch(setOpenPickerMaladieStatut(open));
            dispatch(setActiveTab(4));
        } else if (props.label == "Avis santé publique") {
            dispatch(setOpenPickerAvisSantePublique(open));
            dispatch(setActiveTab(4));
        } else if (props.label == "Succursale") {
            dispatch(setOpenSuccursalePicker(open));
            dispatch(setActiveTab(5));
        } else if (props.label == "Conseiller") {
            dispatch(setOpenPickerConseiller(open));
            dispatch(setActiveTab(5));
        } else if (props.label == "Maladie") {
            dispatch(setOpenPickerMaladie(open));
            dispatch(setActiveTab(4));
        } else if (props.label == "CoronaVirus") {

            dispatch(setOpenPickerCoronaVirus(open));
            dispatch(setActiveTab(4));
        } else if (props.label == "Province") {
            dispatch(setOpenPickerProvince(open));

        } else if (props.label == "Lien") {
            dispatch(setOpenPickerLien(open));
        } else if (props.label == "Année") {
            dispatch(setOpenPickerYearGraphique(open));
        } else if (props.label == "Mois") {
            dispatch(setOpenPickerMonthGraphique(open));
        } else if (props.label == "Semaine") {
            dispatch(setOpenPickerSemaine(open));
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


export default PickerWithSearch;
