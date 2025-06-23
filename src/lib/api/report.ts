import { dateSent } from '@/lib/localUtil'

export async function getAll(filter) {
  const productList = ['Milk', 'Egg', 'Bread', 'Tomato', 'Cereal', 'Mineral water']
  const raNum = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const saleHistoryChart = () => {
    const data = []
    if (filter.date.length === 2) {
      const splitVal = [filter.date[0].split('-'), filter.date[1].split('-')]
      if (splitVal[0].length === 3 && splitVal[0].join() === splitVal[1].join()) {
        for (let i = 6; i <= new Date().getHours(); i++) {
          if (i <= 22) data.push({ date: new Date().setHours(i), value: raNum(1000, 500000) })
        }
      } else if (splitVal[0].length === 2 && splitVal[0].join() === splitVal[1].join()) {
        for (let i = 1; i <= new Date().getDate(); i++) {
          data.push({ date: new Date(new Date().setDate(i)), value: raNum(1000, 500000) })
        }
      } else if (splitVal[0].length === 1 && splitVal[0].join() === splitVal[1].join()) {
        for (let i = 0; i <= new Date().getMonth(); i++) {
          data.push({ date: new Date(new Date().setMonth(i)), value: raNum(1000, 500000) })
        }
      } else {
        const oneDayMs = 1000 * 60 * 60 * 24
        const diffMs = Math.abs(new Date(splitVal[1].join('-')) - new Date(splitVal[0].join('-')))
        const dayNumber = Math.floor(diffMs / oneDayMs)
        for (let i = dayNumber; i >= 0; i--) {
          data.push({ date: new Date().setDate(new Date(new Date(splitVal[1]).getDate() - i)), value: raNum(1000, 500000) })
        }
      }
    } else {
      for (let i = 2022; i <= new Date().getFullYear(); i++) {
        data.push({ date: new Date(new Date().setFullYear(i)).toISOString(), value: raNum(1000, 500000) })
      }
    }
    return data
  }
  const historyList = () => {
    const data = []
    const oneDayMs = 1000 * 60 * 60 * 24
    let splitVal = filter.date.length === 2 ? [filter.date[0].split('-'), filter.date[1].split('-')] : [dateSent().split('-'), dateSent().split('-')]
    const diffMs = Math.abs(new Date(splitVal[1].join('-')) - new Date(splitVal[0].join('-')))
    const dayNumber = Math.floor(diffMs / oneDayMs)
    for (let i = dayNumber; i >= 0; i--) {
      for (let j = 6; j <= 22; j++) {
        if (data.length <= 10) data.push({ date: new Date(new Date().setDate(new Date(new Date(splitVal[1]).getDate() - i))).setHours(j), value: raNum(1000, 250000) })
      }
    }
    return data
  }
  const res = {
    revenue: raNum(300000, 137000000),
    sale: raNum(1000, 500000),
    hiSale: productList[raNum(1, productList.length - 1)],
    loSale: productList[raNum(1, productList.length - 1)],
    productChart: [
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) },
      { name: productList[raNum(1, productList.length - 1)], sales: raNum(1000, 500000) }
    ],
    saleChart: saleHistoryChart(),
    history: historyList()
  }
  return res
}
