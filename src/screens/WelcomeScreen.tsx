import { StackScreenProps } from "@react-navigation/stack";
import { Body, Button, Container, Content, Header, Left, Right, Text, Icon } from "native-base";
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
import { setTweetMovie, setTweetMusic, setViewMode } from "../redux/reducer";


const WelcomeScreen = ({ navigation }: Props) => {

    const AppScreen = () => {
        const viewMode = useSelector(state => state.viewMode);
        const tweetMusic = useSelector(state => state.tweetMusic);
        const tweetMovie = useSelector(state => state.tweetMovie);
        const tweetOriginalMusic = useSelector(state => state.tweetOriginalMusic);
        const tweetOriginalMovie = useSelector(state => state.tweetOriginalMovie);

        const dispatch = useDispatch();


        return (
            <View>

                <StatusBar
                    barStyle="light-content" translucent={true}
                />

                <Header
                    noShadow={true}
                    style={{
                        borderBottomWidth: 0, backgroundColor: '#26a8ed',
                    }}
                ><Left></Left>
                    <Body style={{ flex: 1.75 }}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{"Tweets"}</Text>
                    </Body>
                    <Right>
                        {tweetOriginalMusic.length != tweetMusic.length || tweetOriginalMovie.length != tweetMovie.length ? <TouchableOpacity onPress={() => {
                            dispatch(setTweetMovie(tweetOriginalMovie));
                            dispatch(setTweetMusic(tweetOriginalMusic));
                        }
                        }><Icon type="MaterialIcons" name="refresh" style={{ color: 'white', fontWeight: 'bold', fontSize: 32 }} /></TouchableOpacity>
                            : null}

                    </Right>
                </Header>


                <View
                    style={styles.imgBackground}
                >

                    <View style={{ flex: 1 }}>

                        <View style={{ marginLeft: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: 50, flexDirection: 'row', }}>

                            <Text style={{ color: '#26a8ed', fontWeight: 'bold', fontSize: 24 }}>
                                <Text style={{ color: 'black', fontSize: 24 }}>
                                    Latest
                                </Text>
                                Tweets of {viewMode}
                            </Text>
                        </View>

                        {viewMode == "Movie Star" ? tweetMovie.map((value) => (
                            <View style={{ marginTop: 15, marginLeft: 15 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{value.author}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            let tweetTemp = [];
                                            let tweetIndex = 0;
                                            for (let i = 0; i < tweetMovie.length; i++) {
                                                if (tweetMovie[i].id != value.id) {
                                                    tweetTemp[tweetIndex] = tweetMovie[i];
                                                    tweetIndex++;
                                                }
                                            }
                                            dispatch(setTweetMovie(tweetTemp));
                                        }}
                                    >
                                        <Icon name="cancel" type="MaterialIcons" style={{ color: "#26a8ed", fontSize: 20, marginLeft: 10 }} />
                                    </TouchableOpacity>
                                </View>
                                <Text>{value.tweet}</Text>

                            </View>
                        )) : null}

                        {viewMode == "Music Star" ? tweetMusic.map((value) => (
                            <View style={{ marginTop: 15, marginLeft: 15 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{value.author}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            let tweetTemp = [];
                                            let tweetIndex = 0;
                                            for (let i = 0; i < tweetMusic.length; i++) {
                                                if (tweetMusic[i].id != value.id) {
                                                    tweetTemp[tweetIndex] = tweetMusic[i];
                                                    tweetIndex++;
                                                }
                                            }
                                            dispatch(setTweetMusic(tweetTemp));
                                        }}
                                    >
                                        <Icon name="cancel" type="MaterialIcons" style={{ color: "#26a8ed", fontSize: 20, marginLeft: 10 }} />
                                    </TouchableOpacity>
                                </View>
                                <Text>{value.tweet}</Text>

                            </View>
                        )) : null}



                        <TouchableOpacity
                            onPress={async () => {
                                if (viewMode == 'Movie Star') {
                                    dispatch(setViewMode('Music Star'));
                                } else if (viewMode == 'Music Star') {
                                    dispatch(setViewMode('Movie Star'));
                                }

                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#26a8ed', height: 55, marginBottom: 'auto', marginTop: 50 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>{viewMode == 'Movie Star' ? "View tweets music star" : viewMode == "Music Star" ? "View tweets movie star" : null}</Text>
                        </TouchableOpacity>


                    </View>


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