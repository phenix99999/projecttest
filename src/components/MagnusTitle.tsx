import { Title, Text } from 'native-base'
import * as React from 'react';
const MagnusTitle = (props: { title?: string }) => {
    return (
        <Text style={{ fontFamily: 'avant-garde', fontSize: 24, color: 'white', fontWeight: 'bold' }}>
            {props.title ? props.title : 'MAGNUS POIRIER'}
        </Text>
    );
}
export default MagnusTitle;
