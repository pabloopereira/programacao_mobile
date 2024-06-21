import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
} from "./styles";
import { SpendingStorageDTO } from "../../spending/SpendingStorageDTO";

type Props = {
  data: SpendingStorageDTO
}
export function Calcular(code: string, value: number, state: string){
  let taxValue = 0;
  if ((code === '1234' || code === '6789') && state === 'RJ') {
    taxValue = value * 0.01;
  } else if ((code === '1234' || code === '6789') && state === 'SP') {
    taxValue = value * 0.02;
  } else if ((code === '1234' || code === '6789') && state === 'MG') {
    taxValue = value * 0.03;
  }
  return taxValue
}

export function TransactionExpenses({ data }: Props) {
 
const calcula = Calcular(data.code, data.value, data.state);

const valorTotal = data.value + calcula
  return (
    <Container>
      <Description>{data.fiscalnote}</Description>
      <Amount>{data.code}</Amount>
      <Local>{valorTotal}</Local>

      <Footer>
        <Category>{data.state}</Category>
        <Date>{data.supplier}</Date>
      </Footer>

    </Container>
  )
}