import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList , Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const CandidatesOfIndividualPositions = ({ position, membersList, getVote, votesArray }) => {


    const scalper = (pos123, position1) => {
        const candidates = [];
        for (i = 0; i < pos123.length; i++) {
            if (pos123[i].asipiring_position === position1) {
                candidates.push(pos123[i]);
            }
        }
        return candidates;
    }

    const data = scalper(membersList, position);

    const voteToReturn = (position, idNumber, last_name_of_candidate) => {

        var voteToRet = {
            'last_name_of_candidate' : last_name_of_candidate,
            'position': position,
            'id_number': idNumber
        }
        return voteToRet;
    }

    const checkBoxAndVotes = (position, idNumber, vote_lastName) => {
        getVote(voteToReturn(position, idNumber, vote_lastName));
        Alert.alert(
            "Selection Registered!",
            "You have selected " + vote_lastName + " as your " + position + ". You may change your vote by selecting another candidate. Please continue your selection of other candidates for other positions or if you are finished, click Finalize Votes.",
            [
                { text: "Close", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
            );
    }

    return (
        <View style={styles.containerDesign}>
            <Text style={styles.titleText}>{position}</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => checkBoxAndVotes(item.asipiring_position, item.id, item.last_name)}>
                        <View style={styles.candidateBox}>
                        <Text style={styles.candidateText}>{item.last_name}, {item.first_name} {item.middle_initial}</Text>
                        </View>
                    </TouchableOpacity>)}/>
        </View>
    )
};

const styles = StyleSheet.create({
    containerDesign: {
        flex: 1,
        marginVertical: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10

    },
    titleText: {
        marginHorizontal: 5,
        marginBottom: 10,
        fontSize: 30
    },
    candidateText: {
        fontSize: 20
    },

    candidateBox: {
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default CandidatesOfIndividualPositions;