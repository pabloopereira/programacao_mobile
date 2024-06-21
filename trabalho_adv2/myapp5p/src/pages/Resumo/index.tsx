import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Calcular } from "../../components/TransactionsExpenses";
import { spendingGetAll } from "../../spending/spendingGetAll";
import { Container, Content, Title } from "./styles";
import { AbaResumo } from "../../components/AbaResumo"
import { View ,ScrollView } from "react-native";
type CategoryData ={
  fornecedores: string;
  total: number;
  estado: string;
}

export function Resumo(){
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  async function loadData() {
    const dataC = await spendingGetAll()
    const categories = ['Microsoft','Totvs']
    const codigos = ['1234', '6789']
    const estados = ['SP', 'MG', 'RJ'] 
    const totalByCategory: CategoryData[] = []
    
    categories.forEach(fornecedores => {
      estados.forEach(estado => {


      let Somacategory = 0
      
      dataC.forEach(data =>{
        if(data.supplier === fornecedores && data.state === estado && codigos.includes(data.code)){
          Somacategory += data.value + Calcular(data.code, data.value, data.state)
        }
        
      })
      if (Somacategory > 0){
        totalByCategories.push({
          fornecedores: fornecedores,
          total: parseFloat(Somacategory.toFixed(2)),
          estado: estado
        })
      }
    })
    })
    const resumoFiltrado = totalByCategories.filter(item => item.total > 0);

    setTotalByCategories(resumoFiltrado)
  }
  useFocusEffect(useCallback(() => {
    loadData()
  },[])
);
return(
  <Container>
    <Title>
      Resumo
    </Title>
    <Content >
      {
        totalByCategories.map((item, index) => (
          <AbaResumo
          key={index}
          fornecedores={item.fornecedores}
          estado={item.estado}
          total={item.total}
         
          />
        ))
      }
      
    </Content>
  </Container>
  
)

}