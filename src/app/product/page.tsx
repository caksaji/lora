'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { formatNum, formatCurrency } from '@/lib/localUtil'
import { getAll } from '@/lib/api/product'
import InputText from '@/component/partial/InputText'
import Button from '@/component/partial/Button'
import Table from '@/component/partial/Table'
import IconSvg from '@/component/partial/IconSvg'
import ModalAdd, { ModalAddHandle } from '@/component/functional/product/ModalAdd'
import ModalEdit, { ModalEditHandle } from '@/component/functional/product/ModalEdit'

export default function Product() {
  const modalAdd = useRef<ModalAddHandle>(null)
  const modalEdit = useRef<ModalEditHandle>(null)
  const [allData, setAllData] = useState({})
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [filter, setFilter] = useState({
    name: '',
    onlyLow: false,
    page: 1
  })
  const searchTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    getData()
  }, [filter.onlyLow, filter.page])

  const changeFilter = (v) => {
    const { field, value } = v
    setFilter(d => ({ ...d, [field]: value }))
  }
  const search = useCallback((val) => {
    changeFilter({ field: 'name', value: val })
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }
    searchTimer.current = setTimeout(() => getData(), 1000)
  }, [filter.search])
  const getData = async () => {
    setShowSkeleton(true)
    await getAll({ name: filter.name, low: filter.onlyLow, page: filter.page }).then((res) => {
      setAllData(res)
      setShowSkeleton(false)
    })
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="col-span-full">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <InputText
                value={filter.name}
                showSkeleton={showSkeleton}
                placeholder="Find product by name"
                iconAt="right"
                className="sm:max-w-xs"
                onInput={search}
                icon={<IconSvg name="search" className="h-6 w-6" />}
              />
              <label htmlFor="filterLow" className="flex flex-shrink-0 items-center gap-2">
                <input id="filterLow" type="checkbox" value={true} className="h-6 accent-violet-400 outline-0 ring-offset-2 ring-violet-700 focus:ring-3 dark:ring-offset-gray-800" onChange={() => changeFilter({ field: 'onlyLow', value: !filter.onlyLow })} />
                <span>Low stock</span>
              </label>
            </div>
            <Button color="violet" showSkeleton={showSkeleton} skeletonWidth="w-36" className="ml-auto" onClick={() => modalAdd.current?.open()}>
              Add new product
            </Button>
          </div>
        </div>
        <div className="col-span-full">
          <div className="w-full sm:p-4 sm:rounded-xl sm:space-y-4 sm:bg-gray-100 dark:sm:bg-gray-800">
            <Table
              showSkeleton={showSkeleton}
              emptyData={allData?.data?.length > 0 ? false : true}
              emptyDataText="Oops, no products found"
              minShowTableAt="xs"
              meta={{
                fromRow: allData?.meta?.from_row,
                toRow: allData?.meta?.to_row,
                totalRow: allData?.meta?.total_row,
                lenghtRow: allData?.meta?.lenght_row,
                currentPage: allData?.meta?.current_page,
                totalPage: allData?.meta?.total_page
              }}
              minShowTableAt="sm"
              onChangePage={to => changeFilter({ field: 'page', value: to })}
              card={allData?.data?.map((d, i) => (
                <div key={i} className="card-col">
                  <div className="card-border">
                    <div className="title text-lg">
                      {d.name}
                    </div>
                    <div className="divide-y divide-gray-400 dark:divide-gray-600">
                      <div className="flex gap-4 justify-between w-full py-2">
                        <span>Stock</span>
                        <div className="flex gap-2 justify-end w-32 text-right">
                          {d.stock <= (d.min_stock / 2)
                            ? <span className="px-2 rounded-full bg-red-400/30 text-red-400">Very low</span>
                            : d.stock <= d.min_stock
                              ? <span className="px-2 rounded-full bg-yellow-600/30 text-yellow-600">Low</span>
                              : ''
                          }
                          <span>{formatNum(d.stock)}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 justify-between w-full py-2">
                        <span>Min. Stock</span>
                        <span>{formatNum(d.min_stock)}</span>
                      </div>
                      <div className="flex gap-4 justify-between w-full py-2">
                        <span>Price</span>
                        <span>{formatCurrency(d.price)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button color="violet" className="w-full" onClick={() => modalEdit.current?.open(d)}>
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              thead={
                <>
                  <span className="tcell w-full shrink">Name</span>
                  <span className="tcell w-32 text-center">Stock</span>
                  <span className="tcell w-24 text-center">Min. Stock</span>
                  <span className="tcell w-24 text-center">Value</span>
                </>
              }
              tbody={allData?.data?.map((d, i) => (
                <div key={i} className="tbody">
                  <span className="tcell w-full shrink">{d.name}</span>
                  <div className="tcell flex gap-2 justify-end w-32 text-right">
                    {d.stock <= (d.min_stock / 2)
                      ? <span className="px-2 rounded-full bg-red-400/30 text-red-400">Very low</span>
                      : d.stock <= d.min_stock
                        ? <span className="px-2 rounded-full bg-yellow-600/30 text-yellow-600">Low</span>
                        : ''
                    }
                    <span>{formatNum(d.stock)}</span>
                  </div>
                  <span className="tcell w-24 text-right">{formatNum(d.min_stock)}</span>
                  <span className="tcell w-24 text-right">{formatCurrency(d.price)}</span>
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
      <ModalAdd ref={modalAdd} />
      <ModalEdit ref={modalEdit} />
    </div>
  )
}
