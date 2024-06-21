import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Alert, FlatList } from 'react-native'
import { Header } from '../../components/Header'
import {
  Container,
  Transactions
} from './styles'

import { TransactionExpenses }
  from '../../components/TransactionsExpenses'

import { spendingGetAll } from '../../spending/spendingGetAll'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'

export function Lista() {
  const [code, setCode] =
    useState<SpendingStorageDTO[]>([])

  async function loadDataSpending() {
    try {
      const data = await spendingGetAll()
      setCode(data)
      //console.log(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível ler os dados gravados !!')
    }
  }

  useFocusEffect(useCallback(() => {
    loadDataSpending()
  }, []))

  return (
    
    <Container>
      <Header title='Listagem das Informações' />
    
      {/* <Transactions> */}
      <FlatList
        data={code}
        keyExtractor={item => item.code}
        renderItem={({ item }) =>
          <TransactionExpenses data={item} />
        }
        showsVerticalScrollIndicator={false}
      />
      {/* </Transactions> */}

    </Container>
  )
}
