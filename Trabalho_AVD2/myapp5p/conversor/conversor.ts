export function formatar(amount: string){
    return parseFloat(
        amount
        .slice(2, amount.length)
        .replace('.', '')
        .replace(',', '.')

    )
}