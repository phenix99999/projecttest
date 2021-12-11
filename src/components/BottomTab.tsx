import * as React from 'react';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function BottomTab(props: BottomTabBarProps<BottomTabBarOptions>) {

  //return <Ionicons name={'ios-home'} size={30} style={{ marginBottom: -3 }} />;
  return <Footer>
    <FooterTab>

      <Button
        active={props.state.index === 0}
        onPress={() => props.navigation.navigate("DossierList")}>
        <FontAwesome size={24} name={'files-o'} color={'black'} />
        <Text>Dossiers</Text>
      </Button>
    </FooterTab>
    <FooterTab>
      <Button
        active={props.state.index === 1}
        onPress={() => props.navigation.navigate("Barcode")}>
        <AntDesign size={24} name={'scan1'} color={'black'} />
        <Text>Code QR</Text>
      </Button>
    </FooterTab>
  </Footer>
}


