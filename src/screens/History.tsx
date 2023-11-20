import { Heading, SectionList, Text } from 'native-base';
import { HistotyCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { VStack } from 'native-base';
import { useState } from 'react';



export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "13.11.23",
      data: ['Puxada frontal', "Remada unilateral"]
    },
    {
      title: "14.11.23",
      data: ['Puxada frontal']
    }
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistotyCard /> // Renderiza o Itens da SectionList
        )}

        renderSectionHeader={({ section }) => ( // Component de Header da SectionList
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }} // Estilo aplicado, neste caso para a lista vazia por causa da verificação (exercises.length === 0)
        ListEmptyComponent={() => ( // Comoponent que renderiza quando a SectionList  esta vazia
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda.{'\n'}
            Vamos fazer exercício hoje ?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />



    </VStack>
  )
}