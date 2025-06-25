export async function getAll(filter) {
  const productList = ['Milk', 'Eggs', 'Bread', 'Butter', 'Cheese', 'Yogurt', 'Chicken Breast', 'Ground Beef', 'Pasta', 'Rice', 'Canned Tuna', 'Canned Corn', 'Tomato Sauce', 'Peanut Butter', 'Jam', 'Cooking Oil', 'Salt', 'Sugar', 'Flour', 'Breakfast Cereal', 'Potatoes', 'Onions', 'Garlic', 'Carrots', 'Apples', 'Bananas', 'Oranges', 'Lettuce', 'Tomatoes', 'Cucumbers', 'Frozen Pizza', 'Ice Cream', 'Frozen Vegetables', 'Instant Noodles', 'Coffee', 'Tea', 'Bottled Water', 'Soda', 'Juice', 'Toilet Paper', 'Paper Towels', 'Laundry Detergent', 'Dish Soap', 'Shampoo', 'Toothpaste', 'Body Wash', 'Trash Bags', 'Plastic Wrap', 'Aluminum Foil', 'Snack Chips']
  const raNum = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const dataList = () => {
    const data = []
    for (let i = 1; i <= 10; i++) {
      data.push({
        name: productList[raNum(0, 49)],
        stock: raNum(0, 100),
        min_stock: raNum(25, 50),
        price: raNum(5000, 30000)
      })
    }
    return data
  }
  const res = {
    data: dataList(),
    meta: {
      from_row: (filter.page * 10) - 9,
      to_row: filter.page * 10,
      total_row: 50,
      lenght_row: 10,
      current_page: filter.page,
      total_page: 5
    }
  }
  return res
}
