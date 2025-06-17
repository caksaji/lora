'use client'

import {
  ResponsiveContainer,
  BarChart,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts'

export default function Report() {
  const data = [
    { name: 'Product A', sales: 4000 },
    { name: 'Product B', sales: 3000 },
    { name: 'Product C', sales: 2000 },
    { name: 'Product D', sales: 2780 },
    { name: 'Product E', sales: 1890 }
  ]
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="col-span-1">
        <div className="flex flex-col space-y-4 w-full p-4 rounded-xl bg-gray-100">
          <div className="text-lg font-semibold">
            Top Selling Products
          </div>
          <ResponsiveContainer height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8e51ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
