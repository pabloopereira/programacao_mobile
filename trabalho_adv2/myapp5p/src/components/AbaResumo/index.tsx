import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    resumeStyle,
} from './styles'

type Props = {
  fornecedores: string;
  total: number;
  estado: string;
};

export const AbaResumo: React.FC<Props> = ({ fornecedores, total, estado }) => {
  return (
    <View style={resumeStyle.container}>
      <Text style={resumeStyle.text}>Fornecedor: {fornecedores}</Text>
      <Text style={resumeStyle.text}>Estado: {estado}</Text>
      <Text style={resumeStyle.text}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

export default AbaResumo;