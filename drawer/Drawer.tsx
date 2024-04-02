import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import { Detail, Home } from "../src/screens";

const DrawerMN = createDrawerNavigator();
const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <MyHeader />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  const MyHeader = () => {
    return (
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <Text style={{fontSize:22,color:'black',marginBottom:10}}>Áo cưới</Text>
      </View>
    );
  };

  const Drawer = () => {
    return (
      <DrawerMN.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <DrawerMN.Screen name="Home" component={Home} />
        <DrawerMN.Screen name="About" component={Detail} />
      </DrawerMN.Navigator>
    );
  };
  
  export default Drawer;
  
  const styles = StyleSheet.create({});