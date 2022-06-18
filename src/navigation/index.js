import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CampusMap from "../screens/CampusMap";
import { Entypo, Feather } from '@expo/vector-icons'
import GPACalc from "../screens/GPACalc";

const Tab = createMaterialBottomTabNavigator();

const RootNavigation = () => {

    return(
        <Tab.Navigator
        screenOptions={{ headerShown: false }}
        barStyle={{ backgroundColor: "white" }}
      >
          <Tab.Screen
            name="Campus Map"
            component={CampusMap}
            options={{
                tabBarIcon: ({ color }) => (
                    <Entypo name="map" size={24} color={color} />
                ),
            }}
           />

          <Tab.Screen
            name="GPA Calculator"
            component={GPACalc}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="percent" size={24} color={color} />
                ),
            }}
           />
    
        </Tab.Navigator>
    );


}


export default RootNavigation;