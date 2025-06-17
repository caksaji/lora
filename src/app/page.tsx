'use client'

import {
  ResponsiveContainer,
  BarChart,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line
} from 'recharts'

export default function Report() {
  const highlightData = {
    revenue: 11111,
    sale: 22222,
    hiSale: 33333,
    loSale: 44444,
    productChart: [
      { name: 'Product A', sales: 4000 },
      { name: 'Product B', sales: 3000 },
      { name: 'Product C', sales: 2000 },
      { name: 'Product D', sales: 2780 },
      { name: 'Product E', sales: 1890 }
    ],
    saleChart: [
      { name: '2025-03-15', value: 4000 },
      { name: '2025-03-16', value: 3000 },
      { name: '2025-03-17', value: 2000 },
      { name: '2025-03-18', value: 2780 },
      { name: '2025-03-19', value: 1890 },
      { name: '2025-03-20', value: 2780 },
      { name: '2025-03-21', value: 1890 }
    ]
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      <div className="col-span-1 md:col-span-2">
        <div className="grid grid-cols-1 gap-4 h-full sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="col-span-1 flex items-center gap-4 p-4 rounded-xl bg-gray-100 md:flex-col md:items-start md:justify-between">
              <div className="flex items-center justify-center h-16 w-16 rounded-full text-4xl bg-gray-200">
                <span>💰</span>
              </div>
              <div>
                <div className="text-gray-400">
                  {i === 0 ? 'Total revenue' : i === 1 ? 'Total sales' : i === 2 ? 'Highest sales' : 'Lowest sales'}
                </div>
                <div className="text-lg font-semibold">
                  {i === 0 ? highlightData.revenue : i === 1 ? highlightData.sale : i === 2 ? highlightData.hiSale : highlightData.loSale}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        <div className="flex flex-col space-y-4 w-full p-4 rounded-xl bg-gray-100">
          <div className="text-lg font-semibold">
            Top Selling Products
          </div>
          <ResponsiveContainer height={300}>
            <BarChart data={highlightData.productChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8e51ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="col-span-full">
        <div className="flex flex-col space-y-4 w-full p-4 rounded-xl bg-gray-100">
          <div className="text-lg font-semibold">
            Sales Value History
          </div>
          <ResponsiveContainer height={300}>
            <LineChart data={highlightData.saleChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8e51ff" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
