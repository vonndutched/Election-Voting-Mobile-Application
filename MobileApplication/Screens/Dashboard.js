import React, {useState,useEffect} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import ElectionResults from '../components/ElectionResults';

const Dashboard = ({navigation}) => {

    const [votes, setVotes] = useState([]);
    const [user, setUser] = useState();
    const [hasLoaded, setHasLoaded] =useState(false);

    const member = navigation.getParam('memberDetails');
    const membersArray = navigation.getParam('members');

    

    function getUpdatedMemberDetails (memberID) {
        console.log("getUpdated" + memberID);
        return fetch(`https://jpcs.herokuapp.com/api/members/${memberID}/`)
        .then((response) => response.json())
          .then((json) => {
            setUser(json);
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
    }

    const getVotesFromApi = () => {
        return fetch('https://jpcs.herokuapp.com/api/votes/')
          .then((response) => response.json())
          .then((json) => {
            setVotes(json);
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
      };

    async function setter(userNum){
        const updatedMember = await getUpdatedMemberDetails(userNum);
        await getVotesFromApi();
        setHasLoaded(true);
        console.log(hasLoaded);
    }
    
    useEffect(() => {
        setter(member.id);
    }, []);

    const numberOfVotes = votes.length;

    return(
        <View style={{flex:1}}>
            <View style={styles.titleContainer}>
                <View style={styles.titleHeader}>
                    <Text style={styles.nameText}>{member.first_name} {member.middle_initial} {member.last_name}</Text>
                    <Text style={styles.whiteText}>{member.email}</Text>
                    <Text style={styles.whiteText}>{member.student_number}</Text>
                </View>
            </View>
            <View style={{flex:1}}>
            {member.has_voted ? 
                <View style={styles.messageHolder}>
                    <Text style={styles.message} >You have already voted.</Text>
                    <Text style={styles.message} >Updated Results</Text>
                    <View style={styles.electionHolder}>
                        <ElectionResults/>
                    </View>
                </View> :
                <View>
                    <View style={styles.messageHolder}>
                        <Text style={styles.message}>You haven't voted yet. Click the Vote Button to vote now!</Text>
                        <Text style={styles.message}>There are already {numberOfVotes} JPCS members who voted already!</Text>
                    </View>
                    <View style={styles.centerAlign}>
                        <Text style={styles.buttonLabel}>Vote Now!</Text>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.navigate('Vote', {id: member.id, membersArray: membersArray, memberDetails: member})}>
                        <View style={styles.voteButton}>
                            <MaterialCommunityIcons name="vote-outline" size={24} color="white"/>    
                        </View>
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer:{
        backgroundColor:'blue',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    titleHeader:{
        marginHorizontal:30,
        marginTop:100,
        marginBottom:70,
        fontWeight: 'bold',
    },
    messageHolder:{
        flex:1,
        marginVertical:1
    },
    nameText:{
        fontSize:25,
        color:'white',
        marginBottom: 5
    },
    whiteText:{
        color:'white',
        textDecorationLine: 'underline'
    },
    message:{
        marginHorizontal:30,
        marginVertical:35,
        textDecorationLine: 'underline',
        alignItems:'center'
    },
    voteButton:{
        marginTop:10,
        alignItems:'center',
        justifyContent:'center',
        height: 50,
        borderRadius:40,
        marginHorizontal:25,
        backgroundColor:'blue',
        marginBottom:10
    },
    buttonLabel:{
        
        fontWeight:'bold',
        color:'blue',
        textDecorationLine:'underline'
    },
    centerAlign:{
        marginTop:200,
        alignItems:'center'
    },
    electionHolder:{
        flex:1,
        margin:10
    }
});

export default Dashboard;