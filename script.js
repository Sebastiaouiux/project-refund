// Selecionando elementos do formulário
const expenseAmountInput = document.getElementById("amount")
const expenseName = document.getElementById("expense")
const expenseCategory = document.getElementById("category")
const button = document.getElementById("button")
const form = document.querySelector("form")

// Selecionando a lista (ul)
const expenseList = document.querySelector("ul")
const expenseTotal = document.querySelector("aside header h2")

const expenseQuantity = document.getElementById("total")

// capturando o evento de input para formatar o valor
expenseAmountInput.oninput = () => {
  // removendo caracteres do valor do input não numericos
  const Regex = /\D/g
  let value = expenseAmountInput.value.replace(Regex, "")

  // transformando o valor em centavos
  value = Number(value) / 100

  // actualizando o valor do input
  expenseAmountInput.value = formatCurrencyKz(value)
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
    expense_amount: expenseAmountInput.value,
    createdAt: new Date(),
  }

  //chamando a função que vai adicionar um novo obj a lista de despesas
  expenseAdd(newExpense)
}
// função que vai adicionar um novo item a lista de despesas
function expenseAdd(newExpense) {
  try {
    //cria o elemento (li) para adiconar na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Criando elementos da li

    //Criando imagem da  despesa
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // cRiando a div de  informaçōes da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")
    // criando as informaçōes da despesa
    const expenseNameItem = document.createElement("strong")
    expenseNameItem.textContent = newExpense.expense

    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name
    // adicionando as informaçōes da despesa a div de info
    expenseInfo.append(expenseNameItem, expenseCategory)

    // Criando span para adicionar o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.textContent = newExpense.expense_amount

    const expenseIconDelete = document.createElement("img")
    expenseIconDelete.classList.add("remove-icon")
    expenseIconDelete.setAttribute("src", "img/remove.svg")

    // Adicionando elementos ao item (li)
    expenseItem.append(
      expenseIcon,
      expenseInfo,
      expenseAmount,
      expenseIconDelete
    )

    // Adicionando o item a list(ul)
    expenseList.append(expenseItem)

    // Chamando a função para apresentar o total de despesas
    updateTotal()
    // chamando a função para limpar o form
    formClear()
  } catch (error) {
    alert("Não foi possível adicionar a lista")
    console.log(error)
  }
}

//actualizando o valor das despesas e somando elas
function updateTotal() {
  const items = expenseList.children
  expenseQuantity.textContent = `${items.length} ${
    items.length > 1 ? "despesas" : "despesa"
  }`

  let total = 0

  for (let item = 0; item < items.length; item++) {
    const itemAmount = items[item].querySelector(".expense-amount")

    //Remvendo caracteres não numericos e substituindo a virgula por ponto

    let value = itemAmount.textContent.replace(/^\d,]/g, "").replace(",", ".")

    value = parseFloat(value)

    if (isNaN(value)) {
      alert("Nao foi possivel converter")
    }

    total += Number(value)
  }
  expenseTotal.textContent = formatCurrencyKz(total)
}

// capturando evento de click de icon de remover
expenseList.addEventListener("click", function (e) {
  // removendo item da lista
  const item = e.target.closest(".expense")
  item.remove()

  // chamando a função para atualizar o total
  updateTotal()
})

function formClear() {
  expenseAmountInput.value = ""
  expenseCategory.value = ""
  expenseName.value = ""

  expenseName.focus()
}
