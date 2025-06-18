'use client'

import { dateShownFormat, timeShownFormat, formatCurrency } from '@/lib/localUtil'
import Skeleton from '@/component/partial/Skeleton'
import Table from '@/component/partial/Table'
import IconSvg from '@/component/partial/IconSvg'

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
    ],
    history: [
      { date: '2025-03-15T03:24:00', value: 99807000 },
      { date: '2025-03-15T03:24:00', value: 99807000 },
      { date: '2025-03-15T03:24:00', value: 99807000 },
      { date: '2025-03-15T03:24:00', value: 99807000 },
      { date: '2025-03-15T03:24:00', value: 99807000 }
    ]
  }
  const showSkeletonTable = false
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      <div className="col-span-full md:col-span-2">
        <div className="grid grid-cols-1 gap-4 h-full sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="col-span-1 flex items-center gap-4 p-4 rounded-xl bg-gray-100 md:flex-col md:items-start md:justify-between">
              <div className="flex items-center justify-center h-16 w-16 rounded-full text-4xl bg-gray-200">
                <span>{i === 0 ? '💰' : i === 1 ? '🛒' : i === 2 ? '👍' : '👎'}</span>
              </div>
              <div>
                <div className="text-gray-400">
                  {i === 0 ? 'Total revenue' : i === 1 ? 'Total sales' : i === 2 ? 'Highest sales' : 'Lowest sales'}
                </div>
                <div className="text-lg font-semibold">
                  {i === 0 ? highlightData?.revenue : i === 1 ? highlightData?.sale : i === 2 ? highlightData?.hiSale : highlightData?.loSale}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-full md:col-span-3">
        <div className="w-full p-4 rounded-xl space-y-4 bg-gray-100">
          <div className="text-lg font-semibold">
            Top Selling Products
          </div>
          <ResponsiveContainer height={300}>
            <BarChart data={highlightData?.productChart}>
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
        <div className="w-full p-4 rounded-xl space-y-4 bg-gray-100">
          <div className="text-lg font-semibold">
            Sales Value History
          </div>
          <ResponsiveContainer height={300}>
            <LineChart data={highlightData?.saleChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8e51ff" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="col-span-full">
        <div className="w-full p-4 rounded-xl space-y-4 bg-gray-100">
          <div className="text-lg font-semibold">
            Transaction History
          </div>
          <Table
            showSkeleton={showSkeletonTable}
            emptyData={highlightData?.history?.length > 0 ? false : true}
            emptyDataText="Oops, no products sold"
            minShowTableAt="xs"
            thead={
              <>
                <span className="tcell w-full shrink">At</span>
                <span className="tcell w-32 text-center">Value</span>
              </>
            }
            tbody={highlightData?.history?.map((d, i) => (
              <div key={i} className="tbody">
                <span className="tcell w-full shrink">{dateShownFormat(d.date, 'medium')}, {timeShownFormat(d.date)}</span>
                <span className="tcell w-32 text-right">{formatCurrency(d.value)}</span>
                {/*<div className="tcell w-28">
                  <div className="flex w-full space-x-2">
                    <SpInputRadio v-model="atmosphere.status" type="toggle" :disabled="loadingToggle" :loading="loadingToggle" @change="changeStatus(atmosphere.id)" />
                    <SpButton color="blue" size="sm" icon-only @click="openModalEdit(atmosphere)">
                      <template #icon>
                        <IconSvg name="edit-pencil" className="h-5 w-5" />
                      </template>
                    </SpButton>
                  </div>
                </div>*/}
              </div>
            ))}
          />
        </div>
      </div>
    </div>
  )
}
