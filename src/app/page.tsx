'use client'

import { useState, useEffect, forwardRef } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useBreakpoint } from '@/hook/useBreakpoint'
import { dateShownFormat, timeShownFormat, formatNum, formatCurrency, dateSent } from '@/lib/localUtil'
import { getAll } from '@/lib/api/report'
import InputDateRange from '@/component/partial/InputDateRange'
import Skeleton from '@/component/partial/Skeleton'
import IconSvg from '@/component/partial/IconSvg'
import Select from '@/component/partial/Select'
import Table from '@/component/partial/Table'
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

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Report() {
  const [reportData, setReportData] = useState({})
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [filter, setFilter] = useState({
    date: '',
    range: [] as [Date, Date] | []
  })
  const { theme } = useTheme()
  const bp = useBreakpoint()
  const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const chartData = {
    product: {
      label: reportData?.productChart?.slice(0, bp.smallerThan('sm') ? 3 : bp.smallerThan('md') ? 5 : bp.smallerThan('lg') ? 4 : 6).map(v => v.name),
      data: [{
        name: 'Sold',
        data: reportData?.productChart?.slice(0, bp.smallerThan('sm') ? 3 : bp.smallerThan('md') ? 5 : bp.smallerThan('lg') ? 4 : 6).map(v => v.sales)
      }]
    },
    sale: {
      label: reportData?.saleChart?.map((l) => {
        return filter.date?.id === '1d' ? new Date(l.date).getHours()
          : filter.date?.id === '7d' || filter.date?.id === 'custom' ? dateShownFormat(l.date, 'medium')
          : filter.date?.id === '1m' ? new Date(l.date).getDate()
          : filter.date?.id === '1y' ? monthList[new Date(l.date).getMonth()]
          : new Date(l.date).getFullYear()
      }),
      data: [{
        name: 'Value',
        data: reportData?.saleChart?.map(v => v.value)
      }]
    }
  }
  const chartOpt = {
    product: {
      chart: {
        fontFamily: 'Poppins, sans-serif',
        redrawOnParentResize: true,
        toolbar: { show: false },
        background: 'transparent'
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return formatNum(val)
          }
        }
      },
      xaxis: { categories: chartData.product.label },
      fill: { colors: ['#8e51ff'] },
      dataLabels: {
        formatter: function(val) {
          return formatNum(val)
        }
      },
      theme: { mode: theme }
    },
    sale: {
      chart: {
        fontFamily: 'Poppins, sans-serif',
        redrawOnParentResize: true,
        toolbar: { show: false },
        zoom: { enabled: false },
        background: 'transparent'
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return formatCurrency(val)
          }
        }
      },
      xaxis: { categories: chartData.sale.label },
      fill: { colors: ['#8e51ff'] },
      stroke: {
        curve: 'smooth',
        lineCap: 'round'
      },
      theme: { mode: theme }
    }
  }
  const dateRangeList = [
    { id: 'all', text: 'All' },
    { id: '1d', text: 'Today' },
    { id: '7d', text: 'Last 7 day' },
    { id: '1m', text: 'This month' },
    { id: '1y', text: 'This year' },
    { id: 'custom', text: 'Custom' }
  ]

  useEffect(() => {
    const nd = new Date()
    let range = []
    let runMethod = false
    if (filter.date?.id !== dateRangeList[dateRangeList.length - 1].id) {
      if (filter.date?.id === dateRangeList[1].id) {
        range = [dateSent(), dateSent()]
      } else if (filter.date?.id === dateRangeList[2].id) {
        range = [dateSent(new Date(nd.setDate(nd.getDate() - 6))), dateSent()]
      } else if (filter.date?.id === dateRangeList[3].id) {
        const month = dateSent().split('-')
        range = [`${month[0]}-${month[1]}`, `${month[0]}-${month[1]}`]
      } else if (filter.date?.id === dateRangeList[4].id) {
        const year = dateSent().split('-')
        range = [year[0], year[0]]
      }
      runMethod = true
    }
    if (runMethod) {
      getData(range)
    }
  }, [filter])

  const changeFilter = (v) => {
    const { field, value } = v
    setFilter(d => ({ ...d, [field]: value }))
  }
  const changeRange = (selection) => {
    changeFilter({ field: 'range', value: selection })
    const dateArr = JSON.parse(JSON.stringify(selection))
    getData([
      dateSent(new Date(new Date(dateArr[0]).setDate(new Date(dateArr[0]).getDate() + 1))),
      dateSent(new Date(new Date(dateArr[1]).setDate(new Date(dateArr[1]).getDate() + 1)))
    ])
  }
  const getData = (range: number = []) => {
    setShowSkeleton(true)
    getAll({ date: range }).then((res) => {
      setReportData(res)
      setShowSkeleton(false)
    })
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      <div className="col-span-full text-xl text-red-500">
        <ul className="list-disc list-inside">
          <li>
            Product page
          </li>
        </ul>
      </div>
      <div className="col-span-full">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-1">
            <Select
              list={dateRangeList}
              value={filter.date}
              preSelect={true}
              showSkeleton={showSkeleton}
              absoluteOptionPosition={true}
              onChange={selection => changeFilter({ field: 'date', value: selection })}
            />
          </div>
          {filter.date?.id === dateRangeList[dateRangeList.length - 1].id &&
            <div className="col-span-1">
              <InputDateRange value={filter.range} minYear={new Date().getFullYear() - 4} showSkeleton={showSkeleton} onChange={selection => changeRange(selection)} />
            </div>
          }
        </div>
      </div>
      <div className="col-span-full md:col-span-2">
        <div className="grid grid-cols-1 gap-4 h-full sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="col-span-1 flex items-center gap-4 p-4 rounded-xl bg-gray-100 md:flex-col md:items-start md:justify-between dark:bg-gray-800">
              <div className="flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full text-4xl bg-gray-200 dark:bg-gray-700">
                <span>{i === 0 ? '💰' : i === 1 ? '🛒' : i === 2 ? '👍' : '👎'}</span>
              </div>
              <div className="w-full">
                <div className="text-gray-400">
                  {i === 0 ? 'Total revenue' : i === 1 ? 'Total sales' : i === 2 ? 'Highest sales' : 'Lowest sales'}
                </div>
                {showSkeleton
                  ? <Skeleton className="h-7 w-1/3 rounded-md mt-1" />
                  : <div className="text-lg font-semibold">
                    {i === 0 ? formatCurrency(reportData?.revenue) : i === 1 ? formatNum(reportData?.sale) : i === 2 ? reportData?.hiSale : reportData?.loSale}
                  </div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-full md:col-span-3">
        <div className="w-full p-4 rounded-xl space-y-4 bg-gray-100 dark:bg-gray-800">
          <div className="text-lg font-semibold">
            Top Selling Products
          </div>
          {showSkeleton
            ? <div className="flex gap-4 w-full pb-4 pl-4 border-b border-l border-gray-400" style={{ height: '300px' }}>
              {[...Array(bp.smallerThan('sm') ? 3 : bp.smallerThan('md') ? 5 : bp.smallerThan('lg') ? 4 : 6)].map((_, i) => (
                <Skeleton key={i} className="w-full rounded-md mt-auto" />
              ))}
            </div>
            : <Chart type="bar" series={chartData.product.data} height="300" options={chartOpt.product} />
          }
        </div>
      </div>
      <div className="col-span-full">
        <div className="w-full p-4 rounded-xl space-y-4 bg-gray-100 dark:bg-gray-800">
          <div className="text-lg font-semibold">
            Sales Value History
          </div>
          {showSkeleton
            ? <Skeleton className="h-2 rounded-md" />
            : <Chart type="line" series={chartData.sale.data} height="300" options={chartOpt.sale} />
          }
        </div>
      </div>
      <div className="col-span-full">
        <div className="w-full p-4 rounded-xl space-y-4 bg-gray-100 dark:bg-gray-800">
          <div className="text-lg font-semibold">
            Transaction History
          </div>
          <Table
            showSkeleton={showSkeleton}
            emptyData={reportData?.history?.length > 0 ? false : true}
            emptyDataText="Oops, no products sold"
            minShowTableAt="xs"
            thead={
              <>
                <span className="tcell w-full shrink">At</span>
                <span className="tcell w-32 text-center">Value</span>
              </>
            }
            tbody={reportData?.history?.map((d, i) => (
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
