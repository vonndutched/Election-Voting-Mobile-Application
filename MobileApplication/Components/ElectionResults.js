import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import IndividualPositionResults from './IndividualPositionResults';

 const ElectionResults = () => {
  
    const [positions, getPositions] = useState([]);
    const [members, getMembers] = useState([]);
    const [votes, getVotes] = useState([]);
    const [positionsHasLoaded, setPositionsHasLoaded] = useState(false);

    function getPositionsFromAPI() {
      return fetch('https://jpcs.herokuapp.com/api/positions/')
          .then((response) => response.json())
          .then((json) => {
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
    }

    function getMembersFromAPI() {
      return fetch('https://jpcs.herokuapp.com/api/members/')
          .then((response) => response.json())
          .then((json) => {
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
    }


    function getVotesFromAPI() {
      return fetch('https://jpcs.herokuapp.com/api/votes/')
          .then((response) => response.json())
          .then((json) => {
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
    }


    async function setter() {
      
      const pos = await getPositionsFromAPI();
      const vot = await getVotesFromAPI();
      const mem = await getMembersFromAPI();

      getPositions(pos);
      getVotes(vot);
      getMembers(mem);

      setPositionsHasLoaded(true);
    }

    useEffect(() => {
      setter();
    }, [])


   return(
     <View >
       {positionsHasLoaded ?
              <View style={styles.containerDesign}>
                  <FlatList
                  data={positions}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                      <View style={styles.individualPanelStyle}>
                        <IndividualPositionResults
                          positionToCount = {item.position}
                          votes = {votes}
                          members = {members} 
                        />
                      </View>
                    )}
                  />
             </View>  
       :
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        }
     </View>
   )
}

const styles = StyleSheet.create({
    individualPanelStyle:{
      
    },
    containerDesign: {
      
        
    },
    container: {
      
      justifyContent: "center",
      marginVertical:10
      
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      
    }
});

export default ElectionResults;