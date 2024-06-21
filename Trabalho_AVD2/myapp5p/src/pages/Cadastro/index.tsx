import { useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage
from "@react-native-async-storage/async-storage";

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputValue } from '../../components/InputValue';
import { spendingCreate } from '../../spending/spendingCreate'
import { spendingGetAll } from '../../spending/spendingGetAll';
import { formatar } from '../../../conversor/conversor';

export function Cadastro() {
const [fiscalnote, setFiscalNote] = useState('')
const [code, setCode] = useState('')
const [value, setValue] = useState('')
const [state, setStates] = useState('')
const [supplier, setSuppliers] = useState('')

async function handleAddNewSpending() {

if (code.trim() === '' && state.trim() === '' &&
supplier.trim() === '' &&
 fiscalnote.trim() === '' && 
 value.trim() === '') {
 return Alert.alert('Atenção',
  'Todos os campos devem ser preenchidos')
}
const validCodes = ['1234', '6789', '1708', '5952'];
if (!validCodes.includes(code)) {
  Alert.alert('Código!', 'Código inválido, são aceitos APENAS os códigos: 1234, 6789, 1708, 5952')
  return;
}

const validStates = ['RJ','SP','MG'];
const stateUpper = state.toUpperCase();

if (validStates.includes(stateUpper)) {
  setStates(stateUpper);
}
else {
  Alert.alert('Estado', 'Estado inválido, são aceitos APENAS os estados: RJ, SP, MG')
  return;
}

const validSuppliers = ['Microsoft', 'Totvs'];
if (!validSuppliers.includes(supplier)) {
  Alert.alert('Fornecedor!', 'Fornecedor inválido, so podem ser aceitos APENAS os fornecedores: Microsoft e Totvs')
  return;
}

const data = {
  id: String(new Date().getTime()),
  fiscalnote,
  code,
  value: formatar(value),
  state: stateUpper,
  supplier,
}

setFiscalNote('')
setCode('')
setValue('')
setStates('')
setSuppliers('')

await spendingCreate(data)
const result = await spendingGetAll()
console.log(result)
}

return (
<Container
 >
<Header title='Cadastro!'/>

  <Input
    placeholder='Nota Fiscal'
    placeholderTextColor='#363F5F'
    value={fiscalnote}
    onChangeText={value => setFiscalNote(value)}
  />

  <Input
    placeholder='ID do imposto'
    placeholderTextColor='#363F5F'
    value={code}
    onChangeText={value => setCode(value)}
    maxLength={4}
  />

  <InputValue
    placeholder='Valor'
    placeholderTextColor='#363F5F'
    value={value}
    onChangeText={value => setValue(value)}
  />

  <Input
    placeholder='Estado'
    placeholderTextColor='#363F5F'
    value={state}
    onChangeText={value => setStates(value)}
  />

  <Input
    placeholder='Fornecedor'
    placeholderTextColor='#363F5F'
    value={supplier}
    onChangeText={value => setSuppliers(value)}
  />

  <Button
    title='Adicionar'
    onPress={handleAddNewSpending}
  />

</Container>
)
}

// limpar o AsyncStorage no IOS
// AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
// Alert.alert('Atencao', 'Programa finalizado !!')
// return

// limpa o AsyncStorage no Android
// await AsyncStorage.clear()
// Alert.alert('Atencao', 'Programa finalizado !!')
// return