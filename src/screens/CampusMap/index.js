import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, ActivityIndicator, Pressable } from 'react-native';
import  MapView,{ Marker }  from 'react-native-maps';
import {useEffect, useState , useRef, useMemo } from 'react';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { 
  SpaceMono_400Regular,
  SpaceMono_700Bold,
  SpaceMono_700Bold_Italic, 
  useFonts 
} from '@expo-google-fonts/space-mono';
import { MaterialCommunityIcons, FontAwesome, Entypo   } from "@expo/vector-icons";
import { DataStore } from 'aws-amplify'
import { Places } from "../../models";

const CampusMap = () => {
  const { width, height } = useWindowDimensions();
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%","50%","95%"], []);
  const [placeMarkers, setPlaceMarkers ] = useState([]);
  const region = {
    latitude: 12.969574186422921,
    longitude: 79.15586925479178,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  }


  let [fontsLoaded] = useFonts({
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic,
    SpaceMono_400Regular 
  });


  useEffect(() => {
    const zoomIn = () => {
      mapRef.current.animateToRegion(region);
    };
    setTimeout(() => {
      zoomIn();
    },2000);

  },[])

  useEffect(() => {
    DataStore.query(Places).then(setPlaceMarkers);
  },[])

  if(!placeMarkers) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color:'gray'}} size={'large'} />
  }

  useEffect(() => {
    if(!placeMarkers) {
      return;
    }
    const subscription = DataStore.observe(Places).subscribe( msg => {
      setPlaceMarkers(msg.element);
    })
    return () => subscription.unsubscribe();
  },[placeMarkers])

  const goToReg = (latitude, longitude) => {
    
    const gtr = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0009,
      longitudeDelta: 0.0009,
    }
    mapRef.current.animateToRegion(gtr);
    bottomSheetRef.current?.collapse();
    
  }

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
      <View style={styles.container} >
          <MapView
            ref={mapRef}
              style={{
                  height: height,
                  width
              }}
              showsUserLocation
              followsUserLocation
              showsTraffic
          >
            {placeMarkers.map((place) => 
            (
              <Marker
                coordinate={{
                  latitude: place?.lat,
                  longitude: place?.lng,
                }}
                title={place?.name}
                description={place?.description}
                >
                <View style={{ backgroundColor: "#2980b9", padding: 6, borderRadius: 20 }}>
                  {place?.category === "academics" ?
                  <MaterialCommunityIcons name="book-education" size={20} color="white" />
                  :
                  (place?.category === "shop" ? 
                    <Entypo name="shop" size={20} color="white" />
                    :
                    <FontAwesome name="building-o" size={20} color="white" />
                  )

                }
                </View>
              </Marker>
            ))}
          </MapView>
          <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
            <View style={{ alignItems: 'center'}}>
              <Text style={{
                fontFamily: "SpaceMono_700Bold",
                fontSize: 20,
                margin: 10
              }}>Places Around the Campus</Text>

            </View>

            <BottomSheetFlatList
              data={placeMarkers}
              style={styles.placesContainer}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                      <Pressable onPress={() => goToReg(item?.lat,item?.lng)} style={styles.placeBox}>
                        <Text style={styles.placeText}>{item?.name}</Text>
                        <Text style={styles.placeTypeText}>{item?.category.toUpperCase()}</Text>
                        <Text style={styles.placeDescText}>{item?.description}</Text>
                      </Pressable>
                );
              }}
            />

          </BottomSheet>
      </View>
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
    marginBottom: 16,
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

export default CampusMap;