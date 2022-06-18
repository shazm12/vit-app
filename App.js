import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, ActivityIndicator } from 'react-native';
import  MapView,{ Marker }  from 'react-native-maps';
import {useEffect, useState , useRef, useMemo } from 'react';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { 
  SpaceMono_400Regular,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic, 
  useFonts 
} from '@expo-google-fonts/space-mono';
import places from './src/assets/data/places.json';
import { MaterialCommunityIcons, FontAwesome, Entypo   } from "@expo/vector-icons";
import CampusMap from "./src/screens/CampusMap";
import RootNavigation from "./src/navigation";
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports';
import AuthContextProvider from './src/context/AuthContext';


Amplify.configure(awsconfig);

export default function App() {


  let [fontsLoaded] = useFonts({
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
    SpaceMono_400Regular 
  });


  if(!fontsLoaded) {
    return <ActivityIndicator 
            size={"large"} 
            style={{ 
              flex: 1, 
              justifyContent: 'center',
              alignItems: 'center'
            }} 
            color="grey" />;
  }

  return (
    <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthContextProvider>
              <RootNavigation />
            </AuthContextProvider>
        </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',

  },
  placesContainer: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: wp('4%'),
    padding: 8,
  },
  placeText: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 18
  },
  placeBox: {
    padding: 10,
    marginVertical: 8,
    elevation: 1,
  },
  placeTypeText: {
    fontFamily: 'SpaceMono_700Bold_Italic',
    marginVertical: hp('1%'),
    fontWeight: "600"

  },
  placeDescText: {
    fontFamily: "SpaceMono_700Bold",
    fontSize: 18,
    color: 'gray'
  }
});
