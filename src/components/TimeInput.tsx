import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from '../redux/store';
import { setRvTime, setVetementHeureRecup } from '../redux/reducer';

const TimeInput = (props) => {

    const dispatch = useDispatch()
    const heureRvText = useSelector(state => state.heureRvText);
    const timeInput = useSelector(state => state.timeInput);
    const activeTab = useSelector(state => state.activeTab);
    const heureRecupVetementText = useSelector(state => state.heureRecupVetementText);
    const isFrench = useSelector(state => state.isFrench);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10, marginLeft: 10, width: '55%' }}>
                <Text style={{ fontSize: 16 }}>{isFrench ? props.label : props.labelEn}</Text>
            </View>
            <MaskedTextInput
                placeholder='00:00'
                mask="99:99"
                value={activeTab == 2 ? heureRecupVetementText.substring(0, 5) : heureRvText.substring(0, 5)}
                onChangeText={(text, rawText) => {
                    if (text.length == 0) {
                        return;
                    }
                    if (props.locked()) {
                        return;
                    }

                    if (activeTab == 5) { // condition pour faire fonctionner le mask sinon il mettait toujours valeur a ""
                        dispatch(setRvTime(text));
                    }
                    else if (activeTab == 2) {
                        dispatch(setVetementHeureRecup(text));
                    }
                }}
                style={styles.input}
                keyboardType="numeric"
            />

        </View>
    )
}

export default TimeInput;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 8,
        flexDirection: 'row',
        marginTop: 15
    },
    input: {
        marginLeft: 'auto', marginRight: 10, minWidth: 30, height: 35, maxHeight: 35, borderColor: 'black', borderWidth: 1, maxWidth: '50%', backgroundColor: 'white', borderRadius: 5, width: 65, textAlign: 'center'
    },
})