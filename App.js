import React from 'react'; 
import {ClubNavigation} from './navigation/ClubNavigation'
import { StyleSheet } from 'react-native';

export default function App() {
  return(
      <ClubNavigation/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});