import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";


const Home = props => {
  

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>Projet football</Text>
        </ImageBackground>
      </View>
    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 32,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });
  
export default Home;