export async function get(date) {
  const productList = ['Milk', 'Egg', 'Bread', 'Tomato', 'Cereal', 'Mineral water']
  const raNum = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const itemList = () => {
    const data = []
    for (let i = 1; i <= raNum(1, productList.length); i++) {
      const name = productList[raNum(0, productList.length - 1)]
      data.push({ item: name, value: raNum(1000, 10000), qty: raNum(1, 7) })
    }
    return data
  }
  const total = (list) => {
    let sum = 0
    list.forEach((l, i) => sum = sum + (l.value * l.qty))
    return sum
  }
  const listedItem = itemList()
  const res = {
    data: {
      at: date,
      item: listedItem,
      total: total(listedItem)
    }
  }
  return res
}
