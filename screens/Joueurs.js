import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,Image, SafeAreaView, ScrollView, Button, TouchableHighlight } from "react-native";
import {API_KEY} from 'react-native-dotenv';
import uuid from 'react-native-uuid';

export function Joueurs({ navigation,route }){
    
    
  
    const [players,setPlayers] = useState([]);
   

    const {season} = route.params;
    const {league} = route.params;
    const {id} = route.params;
    async function getPlayers(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            'x-rapidapi-key': API_KEY
            },
          };
          
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${id}&league=${league}&season=${season}`, requestOptions)
         const json =  await response.json();
          if(response.ok){
              setPlayers(json.response.map((player) => player.player));
          }  
          else{
              return null
          }
        }

        function seeDetail(player){
            navigation.navigate('Joueur',{JoueurId : player.id, season : season, league : league, team: id, firstname : player.firstname, lastname : player.lastname })
        }


        useEffect(() => {
            getPlayers();
            
        },[])

   

    return (
        
        <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <Text>Players</Text>
               
                {
            
                    players.map((player) => {
                        return(
                            <TouchableHighlight
                            key={player.id}
                    
                          
                            >
                            <View style={styles.players} >
                                 <Image 
                           style={{width: 60, height: 60, borderRadius: 20}}
                           source={{uri:`https://media.api-sports.io/football/players/${player.id}.png`}} />
                                <Text style={styles.text}>{player.firstname}    {player.lastname}</Text>
                            
                                <Text style={styles.text}>{player.height} </Text>
                                <Text style={styles.text}>{player.weight} </Text>
                                <Button onPress={() => seeDetail(player)}  title="See more details"/>
                              
                            </View>
                            </TouchableHighlight>
                        )
                    })
                }
                
                    
            </View>
            </ScrollView>
            </SafeAreaView>
        
      )


}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center'
    },
    players: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        padding: 20,
        margin: 20,
        width: 300,
        borderRadius: 20,
        backgroundColor: "#001f3f"
    },
    stats: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        padding: 10,
        margin: 20,
        width: 250,
        borderRadius: 20,
        backgroundColor: '#001f3f'
    },
    text: {
        color: "#fff",
        padding: 4,
        margin : 2,
    },
    textStats: {
        color: "#fff",
        padding: 4,
        margin : 2,
        fontWeight: 'bold'

    }

  });
  