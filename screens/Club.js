import react, { useEffect, useState, useRef } from "react";
import {
    Text,
    View, 
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableHighlight,
    Image,
    Button,
    RefreshControl,
    TextInput
  } from "react-native";
  import { API_KEY } from '@env';
  import 'react-native-get-random-values';


export default function Club({route,navigation}){
   

  
    const {league} = route.params;
    const {name} = route.params
   const {season} = route.params;

   useEffect(() => {
    getClubByCountry();
},[])


 

    const [teams,setTeams] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    
    
    
   

  
    
    async function getClubByCountry(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            'x-rapidapi-key': API_KEY
            },
          };
          
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${league}&season=${season}`, requestOptions)
         const json =  await response.json();
          if(response.ok){
              console.log('g')
              setTeams(json.response.map((team) => team.team))  
             
             
          }  
          else{
              return null
          }
        }

     
   
        
        async function seePlayers(id){
          
            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    'x-rapidapi-key': API_KEY
                },
              };
              const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${id}&league=${league}&season=${season}`,requestOptions)
              const json = await response.json();
              if(response.ok){ 
                  
                  navigation.navigate('Joueurs',{id: id, league: league, season: season})
                }
                else{
                    alert('Error')
                    console.log(name,season,league,id)
                }
                
            }

         
           

           function goPreviousPage(){
               navigation.navigate('Countries')
           }
  
        return(
            
       
            <SafeAreaView>
                 <View >
             
                <Button  onPress={() => goPreviousPage()} title="Previous page"/>
                  
            </View>
           
                <ScrollView
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {setTeams(teams)}}
                    />
                  }
                >
            <View style={styles.screen}>
    
    
            
                    </View>
                    {
                        teams.map((team) => {
                            return(
                            <TouchableHighlight
                            key={team.id}
                            
                            underlayColor="#4c8527">
                                <View  style={styles.containerJoueur}>
                            <View style={styles.infoTeam} >
                            <View style={styles.img}>
                           <Image 
                           style={{width: 60, height: 60}}
                           source={{uri:`https://media.api-sports.io/football/teams/${team.id}.png`}} />
                                </View>
                                <Text >{team.name} </Text>
                               
                                <Button title="Search player" onPress={() => {seePlayers(team.id)}}/>
                               
                        

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
            justifyContent: 'flex-start',
            alignItems: 'center'
    
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 80,
            backgroundColor: '#fff',
            borderRadius: 26,
            margin: 20,
            width: 200
        },
        title: {
            marginBottom: 15,
        },
        info: {
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row'
        },
        input: {
            marginHorizontal: 5,
        },
        joueur: {
            
            paddingVertical: 50,
            paddingBottom: 180,
            backgroundColor: 'red',
            borderRadius: 26,
            margin: 20,
            alignItems: "center",
           
        },
        img:{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            alignContent:'center'
        },
        containerJoueur: {
            display: 'flex',
            flex: 2,
            padding: 20,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:'row',
            backgroundColor: '#ffff',
            marginBottom: 10,
            borderRadius: 50,
            margin: 20,
            borderWidth: 2,
            borderColor: '#001f3f'
        },
        infoTeam:{
            textAlign: 'center',
            alignItems: 'center'
        },
        btn:{
            paddingTop: 20
        },
        imgPlayer:{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            borderRadius: 15,
        },
        input: {
            borderWidth : 2,
            borderRadius: 20,
            textAlign: 'center'
        }
    
    });