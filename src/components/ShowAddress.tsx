import { Title, Text } from 'native-base';
import { View } from 'react-native';
import * as React from 'react';
const ShowAddress = (props: { title?: string }) => {
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ marginLeft: 'auto', marginRight: 25, textAlign: 'center' }}>{props.adresse}</Text>
            <Text style={{ marginLeft: 'auto', marginRight: 25, textAlign: 'center' }}>{props.ville}, {props.province}</Text>
            <Text style={{ marginLeft: 'auto', marginRight: 25, textAlign: 'center' }}>{props.codePostal.toUpperCase()},{props.pays}</Text>
        </View>
    );
}
export default ShowAddress;
