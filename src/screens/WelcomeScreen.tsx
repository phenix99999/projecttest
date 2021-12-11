import { StackScreenProps } from "@react-navigation/stack";
import { Body, Button, Container, Content, Header, Left, Right, Text } from "native-base";
import * as React from "react";
import { Alert, Image, ImageBackground, ImageSourcePropType, ScrollView, StyleSheet, View, Platform, StatusBar } from "react-native";
import MagnusTitle from "../components/MagnusTitle";
import { LoginStackParamList } from "../types";
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from "react-native-gesture-handler";
import SyncStorage from 'sync-storage';

import ChampDeTexte from '../components/ChampDeTexte';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import { get } from '../utils/toadConnectorFileMaker';

import tz from "moment-timezone";


const WelcomeScreen = ({ navigation }: Props) => {

    const AppScreen = () => {
        const itemId = useSelector(state => state.itemId);

        return (
            <View>

                <StatusBar
                    barStyle="light-content" translucent={true}
                />
                <View
                    style={styles.imgBackground}
                >

                    <View style={{ flex: 1 }}>

                        <View style={{ marginLeft: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: 50, flexDirection: 'row', }}>

                            <Text style={{ color: '#26a8ed', fontWeight: 'bold', fontSize: 24 }}>
                                <Text style={{ color: 'black', fontSize: 24 }}>
                                    Planet
                                </Text>
                                Rate
                            </Text>
                        </View>

                        <View style={{ marginLeft: 50, marginRight: 50, height: 150 }}>


                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                                <Text style={{ fontSize: 32, color: '#0f4c6c', textAlign: 'center' }}>Trusted reviews.{"\n"}
                                    Smart decisions.</Text>

                            </View>
                        </View>


                        <ChampDeTexte label={'Item #'} labelEn={'Item #'} value={itemId} error={false} />


                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        maxHeight: 25,

                    }}>


                        <TouchableOpacity
                            onPress={async () => {
                                let filter = {};
                                filter.where = {};
                                filter.where.itemId = itemId;

                                await get(global.Host, global.Protocol, global.Ratings, filter);
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#26a8ed', height: 65 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>{itemId.length == 0 ? "View Ratings" : "View Ratings of " + itemId}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ height: 80, marginTop: -50, justifyContent: 'flex-end' }}>
                    <View style={{ position: 'absolute', height: 80, justifyContent: 'flex-end', width: '100%' }}>
                        <LinearGradient
                            style={{ height: 50, width: '100%' }}
                            colors={["transparent", 'black']}
                        ></LinearGradient>
                        <View style={{ backgroundColor: 'black', width: '100%', height: 30, alignItems: 'center', justifyContent: 'center' }}></View>

                    </View>
                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: 22, textAlign: 'center', paddingBottom: 10 }}>{"D'une vie à l'autre\ndepuis 1923"}</Text>

                </View>

                <Image source={require("../assets/images/logo1024.png")} style={[{ height: 40, width: 40, marginLeft: 10, marginTop: 30, position: 'absolute' },]}></Image>

                <ScrollView style={{ flex: 1, padding: 20, flexGrow: 1, borderTopColor: '#94AF2E', borderTopWidth: 4 }} >




                    <StyledButton
                        onPress={() => {
                            navigation.navigate("Complexes");
                        }}
                        text={'Voir nos complexes'}
                        source={require('../assets/images/accueil/complexes.jpg')}
                    />
                    <StyledButton
                        onPress={() => {
                            navigation.navigate("Services");
                        }}
                        text={'Voir nos services'}
                        source={require('../assets/images/accueil/services.jpg')}
                    /> */}


                    {
                    /**
                    <StyledButton 
                                onPress={() => {
                                    navigation.navigate('CimetiereLaval');
                                }}
                                text={'Cimetière Laval'}
                                source={require('../assets/images/cimetiere-laval.png')}
                    />
                    <StyledButton
                                onPress={() => {
                                    navigation.navigate('LesSentiers');
                                }}
                                text={'Cimetière Laval'}
                                source={require('../assets/images/lessentiers.png')}
                    />
                     */}
                    {/* </ScrollView>

                <View style={[styles.subContainer, { justifyContent: "flex-end", height: 80, paddingLeft: 20, paddingRight: 20 }]}>
                    <Button
                        onPress={() => {
                            if (SyncStorage.get('authUser')) {
                                navigation.navigate("Login");
                            } else {
                                navigation.navigate("Form");
                            }
                        }}
                        style={[styles.button, { backgroundColor: "#e38521" }]}
                    >
                        <Text>Se connecter</Text>
                    </Button>
                </View> */}
                </View>
            </View >
        );
    }

    return (
        <Provider store={store}>
            <AppScreen />
        </Provider>);
};
export default WelcomeScreen;

const styles = StyleSheet.create({
    imgBackground: {
        width: '102%',
        backgroundColor: 'white',
        height: '100%'
    },
    content: {
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: 'orange',
        alignItems: "center",
    },
    button: {
        width: '100%',
        margin: 20,

        alignSelf: "center",
        textAlign: "center",
        justifyContent: "center",
    },
    horizontalRule: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    form: {
        backgroundColor: "white",
    },
    subContainer: {
    },
    imgButton: {
        height: 80,
        width: '100%',
        backgroundColor: 'red'

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});