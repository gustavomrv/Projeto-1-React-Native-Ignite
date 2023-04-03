import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert('Participante já existente', 'Já existe um participante com esse nome')
    }
    
    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('');
  }
  
  function handleParticipantRemove(name: string) {
    

    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>    
      
      <Text style={styles.eventDate}>Sexta, 22 de Dezembro de 2023.</Text>    
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"    
          onChangeText={setParticipantName}
          value={participantName}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text> 
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant 
              key={item}
              name={item}
              onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou ainda. Adicione participantes á sua lista de presença
          </Text>
        )}
      />
    
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map(participant => (
            <Participant 
              key={participant}
              name={participant}
              onRemove={() => handleParticipantRemove(participant)} 
            />
          ))
        }
      </ScrollView> */}
      
    </View>
  )
}