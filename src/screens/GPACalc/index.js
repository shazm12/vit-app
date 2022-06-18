import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { 
    SpaceMono_400Regular,
    SpaceMono_700Bold,
    SpaceMono_700Bold_Italic, 
    useFonts 
} from '@expo-google-fonts/space-mono';
import { FontAwesome, Entypo, AntDesign, Ionicons  } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import Modal from "react-native-modal";


const GPACalc = () => {

    let [fontsLoaded] = useFonts({
        SpaceMono_700Bold,
        SpaceMono_700Bold_Italic,
        SpaceMono_400Regular 
    });

    const [courseCredit, setcourseCredit] = useState([]);
    const [courseGrade, setCourseGrade ] = useState([]);
    const [noOfCourses, setNoOfCourses] = useState(3);
    const [modalVisible, setModalVisible ] = useState(false);
    const [GPA , setGPA ] = useState(0.0);
    const credit = [];

    const onSubmit = () => {

      console.log(courseCredit,courseGrade);
      var sum = 0;
      var totalCredits = 0;
      for(var i = courseCredit.length-1; i>=0 ; i-- ) {
        if(courseGrade[i]=='A') {
          sum += 9 * parseInt(courseCredit[i]);
        }
        else if(courseGrade[i]==='B') {
          sum += 8 *  parseInt(courseCredit[i]);
        }
        else if(courseGrade==='C') {
          sum += 7 *  parseInt(courseCredit[i]);
        }
        else if(courseGrade === 'D') {
          sum += 6 *  parseInt(courseCredit[i]);
        }
        else if(courseGrade[i] === 'E') {
          sum += 5 *  parseInt(courseCredit[i]);
        }
        else if(courseGrade[i] === 'F') {
          sum += 4 *  parseInt(courseCredit[i]);
        }
        else if(courseGrade[i]==='S') {
          sum += 10 *  parseInt(courseCredit[i]);
        }
        totalCredits += parseInt(courseCredit[i]);

      }

      var gpa = sum / totalCredits;
      setGPA(gpa);
      setModalVisible(true);

    
    }


  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal isVisible={modalVisible}>
          <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
            width: "100%"
          }}>
            <View
              style={{
                backgroundColor: '#efefef',
                paddingTop: 20,
                paddingBottom: 30,
                paddingHorizontal: 20,
                width: "85%",

              }}
            >
              <View style={{
                alignItems: 'flex-end',
                marginBottom: 20,
              }}>
                <Ionicons onPress={() => setModalVisible(!modalVisible)} name="close" size={24} color="black" />
              </View>
              <Text
                style={{
                  fontFamily: 'SpaceMono_700Bold',
                  fontSize: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                ⏳ Your GPA is : {GPA.toFixed(2)}
              </Text>
            </View>
            
          </View>
        </Modal>
        <Text style={styles.title}>GPA Calculator</Text>
        <View style={{
          flexDirection: 'row'
        }}>
          <LinearGradient 
            colors={['#000000','#434343']} 
            start={{x: 0.0, y: 0.4}} end={{x: 0.8, y: 1.2}}
            locations={[0.,0.8]}
            style={styles.submitBtn}
          >
            <Pressable style={{
              flexDirection: 'row'
            }}
            onPress={() => {
              setNoOfCourses(noOfCourses+1);
            }}
            >
              <Text style={{
                color: 'white',
                fontWeight: 'bold'
              }}>Add Course</Text>
              <Entypo name="plus" size={24} style={{ marginTop: -2, marginLeft: 4}} color="white" />
            </Pressable>
          </LinearGradient>
          <LinearGradient 
            colors={['#000000','#434343']} 
            start={{x: 0.5, y: 0.2}} end={{x: 0.9, y: 0.6}}
            locations={[0.,0.8]}
            style={styles.resetBtn}
          >
            <Pressable style={{
              flexDirection: 'row'
            }}
            onPress={() => {
              setNoOfCourses(3);
              setcourseCredit([]);
              setCourseGrade([]);
            }}
            >
              <AntDesign name="reload1" size={24} color="white" />
            </Pressable>
          </LinearGradient>
        </View>
        {[...Array(noOfCourses)].map((e,i) => {
        let coursePlace = `Course Credit ${i+1}`;
        let gradePlace = `Grade for Course ${i+1}`;
        return (

          <View key={i} style ={styles.inputContainer}>
          <View style={styles.courseContainer}>
            <TextInput 
              placeholder={coursePlace} 
              style={styles.inputBox}
              onChangeText={(cred) => {
                if(cred.length == 1 && (cred >='1' && cred <='4')) {
                  setcourseCredit(old => [...old,cred] );
                }
              }}
              value={courseCredit[i]}
      
              
            />
            <TextInput 
              placeholder={gradePlace} 
              style={styles.inputBox} 
              onChangeText={(grade) => {
                if(grade.length == 1 && (grade === 'A' || grade==='B' || grade==='C' || grade==='D' || grade==='E' || grade==='F' || grade==='S')) {
                  setCourseGrade(old => [...old,grade]);
                }
              }}
              value={courseGrade[i]}
            />
          </View>
          </View>

        )})}

        <LinearGradient 
          colors={['#000000','#434343']} 
          start={{x: 0.0, y: 0.8}} end={{x: 0.9, y: 1.2}}
          locations={[0.,0.8]}
          style={styles.submitBtn}
        >
          <Pressable onPress={onSubmit}  >
              <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efefef',
      justifyContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 80,
    },
    title: {
        fontFamily: 'SpaceMono_700Bold',
        fontSize: 30,
        letterSpacing: 2,
    },
    inputContainer: {
        marginTop: 20,
    },
    courseContainer: {
        marginTop: 10,
        elevation: 2,
    },
    inputBox: {
        width: 200,
        height: 50,
        borderBottomColor: '#121212',
        borderBottomWidth: 2,
        fontFamily: 'SpaceMono_400Regular',
        fontWeight: '700'

    },
    submitBtn: {

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 20,

    },

    resetBtn: {

      paddingHorizontal: 10,
      paddingVertical: 10,
      marginTop: 20,
      marginLeft: 10,
      borderRadius: 25,

    },
    submitText: {
        fontWeight: 'bold',
        color: 'white',
    }
    


});

export default GPACalc;