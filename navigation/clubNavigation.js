import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Club from '../screens/Club';
import Home from '../screens/Home';
import Countries from '../screens/Countries';
import { Joueurs } from '../screens/Joueurs';
import Joueur from '../screens/Joueur';
const Stack = createBottomTabNavigator();

function ClubNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#001f3f'
      },
      headerTitleStyle: {
        color: 'white'
      },
      tabBarStyle: {
        backgroundColor: '#001f3f'
      }
    }}
  >
    
   <Stack.Screen
          name="Home" 
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image 
                source={
                  focused ?
                  require('../assets/HomeFocused.png') :
                  require('../assets/Home.png') 
                }
                style={{
                  width: size,
                  height: size,
                }}
              />
            ),
            name: 'Home'
          }} 
        />
      <Stack.Screen 
      name="Countries" 
      component={Countries}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image 
            source={
              focused ?
              require('../assets/CountryFocused.png') :
              require('../assets/country.png') 
            }
            style={{
              width: size,
              height: size,
            }}
          />
        ),
        name: 'Countries'
      }} 

       />
      <Stack.Screen
          name="Clubs" 
          component={Club}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image 
                source={
                  focused ?
                  require('../assets/teamFocused.png') :
                  require('../assets/team.png') 
                }
                style={{
                  width: size,
                  height: size,
                }}
                />
                ),
                name: 'Clubs'
              }}
        />
              <Stack.Screen
                 name="Joueurs" 
                 component={Joueurs}
                 options={{
                   tabBarIcon: ({ focused, color, size }) => (
                     <Image 
                       source={
                         focused ?
                         require('../assets/statsFocused.png') :
                         require('../assets/stats.png') 
                       }
                       style={{
                         width: size,
                         height: size,
                       }}
                     />
                   ),
                   name: 'Joueurs'
                     }}
               />
                <Stack.Screen
                 name="Joueur" 
                 component={Joueur}
                 options={{
                   tabBarIcon: ({ focused, color, size }) => (
                     <Image 
                       source={
                         focused ?
                         require('../assets/playerFocused.png') :
                         require('../assets/player.png') 
                       }
                       style={{
                         width: size,
                         height: size,
                       }}
                     />
                   ),
                   name: 'Joueur'
                     }}
               />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
 export default ClubNavigation;
