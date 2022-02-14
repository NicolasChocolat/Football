
import React from "react";
import { useState, useEffect } from "react";
import { Text, View, Button , StyleSheet,Image,SafeAreaView,ScrollView} from "react-native";
import {API_KEY} from 'react-native-dotenv';
export default function Joueur({navigation,route}) {

    const {JoueurId} = route.params;
    const {season} = route.params;
    const {league} = route.params;
    const {team} = route.params;
    const {firstname} = route.params;
    const {lastname} = route.params;
    const [position,setPosition] = useState('');
    const [cards,setCards] = useState('');
    const [passes,setPasses] = useState('');
    const [accuracy,setAccuracy] = useState('');
    const [goal,setGoal] = useState('');
    const [duel,setDuel] = useState('');
    const [duelTotal,setDuelTotal] = useState('');

   

    async function seeStatistiques(){
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            'x-rapidapi-key': API_KEY
            },
          };
          
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?id=${JoueurId}&team=${team}&league=${league}&season=${season}`, requestOptions)
         const json =  await response.json();
          if(response.ok){     
              setPosition(json.response.map((stat) => stat.statistics.map((position) => position.games))[0][0]["position"])
              setCards(json.response.map((stat) => stat.statistics.map((cards) => cards.cards))[0][0]["yellow"])
              setPasses(json.response.map((stat) => stat.statistics.map((passe) => passe.passes))[0][0]["total"])
              setAccuracy(json.response.map((stat) => stat.statistics.map((passe) => passe.passes))[0][0]["accuracy"])
              setGoal(json.response.map((stat) => stat.statistics.map((goal) => goal.goals))[0][0]["total"])
              setDuel(json.response.map((stat) => stat.statistics.map((duel) => duel.duels))[0][0]["won"])
              setDuelTotal(json.response.map((stat) => stat.statistics.map((duel) => duel.duels))[0][0]["total"])
             
             
          }  
          else{
              return null
          }
        }
        
          useEffect(() => {
            seeStatistiques();
            
          })
        

    
    return(
      <SafeAreaView>
            <ScrollView>
        <View style={styles.container}>
             <Image 
                           style={{width: 100, height: 100, borderRadius: 20}}
                           source={{uri:`https://media.api-sports.io/football/players/${JoueurId}.png`}} />
                           <View style={styles.playerInfo}>
                             <Text style={styles.text}>{firstname}    {lastname}</Text>
                             <Text style={styles.text}>{position}</Text>
                             </View>
                             <View style={styles.playerInfo}>
                             <Text style={styles.text}>{position}</Text>
                             </View>

                             <View style={styles.playerInfo}>
                             <Text style={styles.text}>{cards} yellow cards</Text>
                             </View>
                             <View style={styles.playerInfo}>
                             <Text style={styles.text}>{passes} passes</Text>
                             </View>
                             <View style={styles.playerInfo}>
                             <Text style={styles.text}>{accuracy} % de précision</Text>
                             </View>
                             <View style={styles.playerInfo}>
                             <Text style={styles.text}>{goal} buts marqués</Text>
                             </View>
                             <View style={styles.playerInfo}>
                             <Text style={styles.text}>{duel} duels gagnés sur {duelTotal} </Text>
                             </View>

                            

        </View>
        </ScrollView>
        </SafeAreaView>
    )
    
    }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderWidth: 2,
      borderColor: '#fff',
      margin: 30,
      borderRadius: 20,
      padding: 20,
      backgroundColor: '#001f3f'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
    playerInfo: {
        padding: 15,
        borderWidth: 1,
        width: '100%',
        margin: 15,
        borderColor: '#fff',
        borderRadius : 20
        
    }
  });