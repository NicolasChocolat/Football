import react, { useContext, useEffect, useRef, useState } from "react";
import {View,StyleSheet, Text,  TextInput,SafeAreaView, ScrollView, ScrollViewComponent, TouchableHighlight,Image, Button } from "react-native";
import {API_KEY} from 'react-native-dotenv';
import uuid from 'react-native-uuid';
import countries from '../data/countries'


function Countries({navigation}) {
  


    const scrollRef = useRef();
    const [leagues,setLeagues] = useState([]);
    const [season,handleSeason] = useState('');
    const [nameCountry,setNameCountry] = useState("");
   
    
    function searchCountry(league){
        navigation.navigate('Clubs',{name: nameCountry,league: league,season: season});
    }

    
    async function getLeaguesByCountry(country){
        console.log(country)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            'x-rapidapi-key': API_KEY
            },
          };
          
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?country=${country}`, requestOptions)
         const json =  await response.json();
          if(response.ok){
              setLeagues(json.response.map((leagues) => leagues.league))
              setNameCountry(json.response.map((leagues) => leagues.country.name))
              scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
              });

  
          }  
          else{
              console.log('gf')
          }
        }

        
  
    return(
       
        <SafeAreaView>
            <ScrollView
            ref={scrollRef}>
        <View style={styles.screen}>
     
                </View>
              
                {
                         leagues.map((league) => {
                             return(
                                 <View style={styles.league} key={league.id}>
                                     <View>
                                        <Image 
                                        style={{width: 60, height: 60, borderRadius: 20}}
                                        source={{uri:`"https://media.api-sports.io/football/leagues/${league.id}.png`}} />
                                     <Text style={styles.name}>{league.name}</Text>
                                     <TextInput 
                                     placeholder="ex: 2020"
                                     style={styles.input}
                                     onChangeText={(season) =>
                                        handleSeason(season)
                                      }
                                     keyboardType="numeric"
                                     title='Season'/>
                                
                                   
                                     <Button color={'red'} style={styles.btn} onPress={() => searchCountry(league.id)} title="Search a season"/>
                                     </View>
                                 </View>
                             )
                         })
                     }
        
               
           
                {
                    countries.map((countrie) => {
                        return(
                        <TouchableHighlight
                        key={uuid.v4()}
                
                       >
                          
                            <View  style={styles.containerJoueur}>
                            <Text style={styles.name} >{countrie.name} </Text>
                            
                            
                        <View style={styles.btn} >
                                <Button 
                                
                                color="red"
                                title="Search a league" onPress={() => {getLeaguesByCountry(countrie.name)}}/>
                      </View>
                        
                        </View>
                         </TouchableHighlight>
                     ) })
                }            
                  
        </ScrollView>
        </SafeAreaView>
    )
    

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
  
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
        backgroundColor: '#fff',
        borderRadius: 26,
        margin: 20,
        textAlign: 'center'

    },
    title: {
        marginBottom: 15,
    },
    info: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    joueur: {
        
        padding: 50,
        backgroundColor: 'red',
        borderRadius: 26,
        margin: 20,
        alignItems: "center",
    },
    img:{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center'
        },
    containerJoueur: {
        display: 'flex',
        paddingHorizontal: 1,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        backgroundColor: '#ffff',
        marginBottom: 10,
        borderRadius: 10,
        margin: 20,
        backgroundColor: '#001f3f'

        
    },
    inputContainer: {
        padding: 50,
        
    },
    searchCountry: {
        borderWidth : 1,
        padding: 10,
        borderRadius: 10,
        width: 180,
        backgroundColor: '#001f3f',
        color: '#fff',
        textAlign: 'center',
        margin: 2,
    },
    name:{
        fontSize: 15,
        color : '#fff',
        textAlign: 'center'
    },
    league:{
        padding: 5,
        borderWidth: 2,
        backgroundColor: '#0074D9',
        margin: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    
  

    },
    btn :{
        color: 'red',
        padding: 2,
        width: 200,
        margin: 2,
    },
    input:{
        borderWidth: 1,
        margin: 4,
        width: 200,
        textAlign: 'center'
    }

});

export default Countries;

