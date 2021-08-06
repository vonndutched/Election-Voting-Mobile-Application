import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const IndividualPositionResults = ({positionToCount, votes, members}) => {

    const [candidatesWithVotes, setCandidatesWithVotes] = useState([]);

    const voteCounter = (isolatedVotesArray, candidatesArray) => {
        
        const votesOfTheMembers = isolatedVotesArray;
        const candidatesArrayCount = candidatesArray;

        for(i=0; i < candidatesArrayCount.length; i++){
            for(j=0; j < votesOfTheMembers.length; j++){
                if(votesOfTheMembers[j].last_name_of_candidate === candidatesArrayCount[i].last_name_of_candidate){
                    candidatesArrayCount[i].votes = candidatesArrayCount[i].votes + 1;
                }
            }
        }

        return candidatesArrayCount;
    }
    
    const votesIsolator = (votesArray) => {
        const votesIsolated = []
        for(i=0; i < votesArray.length; i++){
            const parsedVotes = JSON.parse(votesArray[i].votes);
            votesIsolated.push(parsedVotes);
        }    
        return votesIsolated;
    }

    const positionIsolator = (isolatedParsedVotes, positionToCountString) =>{
        const isolatedPerPosition = []
        for(i=0; i < isolatedParsedVotes.length; i++){
            const voteOfPerson = isolatedParsedVotes[i]
            for(j=0; j < voteOfPerson.length; j++){
                if(voteOfPerson[j].position === positionToCountString){
                    isolatedPerPosition.push(voteOfPerson[j]);
                }
            }
        }

        return isolatedPerPosition;
    }

    const candidateSorter = (membersArray, positionToCountString) => {
        
        const sortedArray = []

        for (i = 0; i < membersArray.length; i++){
            if(membersArray[i].asipiring_position === positionToCountString){
                sortedArray.push(
                    {
                        name: membersArray[i].first_name + ' ' + membersArray[i].middle_initial + ' ' + membersArray[i].last_name,
                        votes: 0,
                        last_name_of_candidate: membersArray[i].last_name
                    }
                )
            }
        }
        
        return sortedArray;

    }

    function setter(membersArray, positionToCountString, votesFromAPI) {
        const sortedCandidates = candidateSorter(membersArray, positionToCountString);
        const votesIsolated = votesIsolator(votesFromAPI);
        const votesIsolatedForPosition = positionIsolator(votesIsolated, positionToCountString);
        const votesCounted = voteCounter(votesIsolatedForPosition, sortedCandidates);

        setCandidatesWithVotes(votesCounted);
        // console.log(votesCounted);
    }

    useEffect(() => {
        setter(members, positionToCount, votes);
    }, [])
    
    return(
        <View style={styles.container}>
            <Text>{positionToCount}</Text>
            <FlatList
                data={candidatesWithVotes}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={styles.candidateContainer}>
                        <Text>{item.last_name_of_candidate}</Text>
                        <Text>Votes: {item.votes}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    candidateContainer:{
        flex:1,
        marginHorizontal: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
});

export default IndividualPositionResults;