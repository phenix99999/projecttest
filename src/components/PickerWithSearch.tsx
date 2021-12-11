import { Button, Text, Header, Left, Body, Right, Icon } from 'native-base';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import * as React from 'react';

const PickerWithSearch = (props: { title?: string }) => {
    const [rvHeure, setRvHeure] = React.useState("");

    const [modal, openModal] = React.useState(false);
    return (
    
    );
}



export default PickerWithSearch;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonChoose: {
        marginLeft: 'auto', marginRight: 15, marginTop: 10, minWidth: 55, height: 35, borderColor: '#06131c'
    },
    buttonChooseError: {
        marginLeft: 'auto', marginRight: 15, marginTop: 10, minWidth: 100, height: 35, borderColor: 'red'
    },

});