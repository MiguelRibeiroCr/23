import { View,Text, FlatList } from "react-native";
import { StyleSheet} from 'react-native';
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import Entity from "../entities/entities";
export default function HomePage(){
   const[countries,SetCountreis]=useState<Entity[]>([]);
  useEffect(()=> {
   var requestOptions = {
      method: 'GET',
    
    };
   var countryList:Entity[]=[];

    fetch('https://restcountries.com/v3.1/all', requestOptions)
    .then(response => response.json())
    .then(result =>{
      result.map(item=>{
      countryList.push({
         id:item.name.comom,
         flagUrl:item.flags.svg,
         name:item.name.comom,
         ptName:item.translations.por.comom,
         population:item.population

      })
      })
    })

    .catch(error=>console.log('error',error));
    SetCountreis(countryList);
    
  },[])
  

  
   
  
   return(
    <View style={styles.container} >
    <Text style={styles.Title}>Lista de Países</Text>
    <FlatList
       data={(countries)}
       renderItem={(countries) => <View id={countries.item.id} style={styles.card}>
          <Image source={{ uri:countries.item.flagUrl }} />

        <Text style={{ fontSize: 20, fontWeight: '600' }}>{countries.item.name}</Text>
          <Text style={{ fontSize: 20, fontWeight: '400', opacity: 0.6 }}>{countries.item.ptName}</Text>
          <Text>{countries.item.population}</Text>
       </View>
       }
       keyExtractor={(item) => item.id}

    />
 </View>
    
   );
   
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     width:'100%',
     backgroundColor: '#1916',
     alignItems: 'center',
     justifyContent: 'center',
   },
   Title:{
      fontSize:30,
      fontWeight:'600',
      marginBottom:30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card:{
      aspectRatio:2.5,
      backgroundColor:'#fff',
      borderRadius:17,
      justifyContent:'flex-start',
      alignItems: 'center',
      
    }

 });