
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, VStack, FlatList, Heading, Text } from 'native-base';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/group';



export function Home() {
  const [groupSelected, setGroupSelected] = useState('Costas');
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro']);
  const [exercises, setExercises] = useState(['Puxada Frontal', 'Remada Curvar', 'Remada Unilateral', 'Levantamento Terra']);

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={String(groupSelected).toLocaleUpperCase() === String(item).toLocaleUpperCase()} // Faz as string ficarem em caixa alta para COMPARAR
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }} // Faz a lista ter um espamento horizontal em casa elemento
        my={10} // Aplica os espaçamentos vertical
        maxH={10} // Limita a altura da lista
        minH={10} // Limita a altura da lista
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }} // Faz a lista ter um espamento vertical ao final da lista
        />

      </VStack>
    </VStack>
  )
}