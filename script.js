// Selecionando elementos do formulário
const expenseAmount = document.getElementById("amount")
const expenseName = document.getElementById("expense")
const expenditureCategory = document.getElementById("category")
const button = document.getElementById("button")
const form = document.querySelector("form")

// capturando o evento de input para formatar o valor
expenseAmount.oninput = () => {
  // removendo caracteres do valor do input não numericos
  const Regex = /\D/g
  let value = expenseAmount.value.replace(Regex, "")

  // transformando o valor em centavos
  value = Number(value) / 100

  // actualizando o valor do input
  expenseAmount.value = formatCurrencyKz(value)
}

function formatCurrencyKz(value) {
  // formatando o valor para padrao AO
  value = value.toLocaleString("pt-AO", {
    style: "currency",
    currency: "AOA",
  })
  // retorna o valor formatado
  return value
}

// Peagando o metodo onsubmit do form para pegar os valores
form.onsubmit = (e) => {
  // previnindo o comportamento padrão para não recarregar a página
  e.preventDefault()

  // criando um objecto com os detalhes de
  const newExpense = {
    id: new Date().getTime(),
    expense: expenseName.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    expense_amount: expenseAmount.value,
    createdAt: new Date(),
  }

  //chamando a função que vai adicionar um novo obj a lista de despesas
  expenseAdd(newExpense)
}
// função que vai adicionar um novo obj a lista de despesas
function expenseAdd(newExpense) {
  try {
    //cria o elemento para adiconar na lista
  } catch (error) {
    alert("Não foi possível adicionar a lista")
    console.log(error)
  }
}
