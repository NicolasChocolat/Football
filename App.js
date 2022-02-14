import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ClubNavigation from './navigation/ClubNavigation';

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