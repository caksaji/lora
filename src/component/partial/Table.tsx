'use client'

import { useBreakpoint } from '@/hook/useBreakpoint'
import { keydownEnter } from '@/lib/localUtil'
import Skeleton from '@/component/partial/Skeleton'
import ErrorData404 from '@/component/partial/ErrorData404'
import IconSvg from '@/component/partial/IconSvg'

export default function Table({
  className,
  showSkeleton = false,
  emptyData = false,
  emptyDataText = 'Oops, data is unavailable',
  meta = {
    fromRow: null,
    toRow: null,
    totalRow: null,
    lenghtRow: null,
    currentPage: null,
    totalPage: null
  },
  minShowTableAt = 'lg',
  card,
  thead,
  tbody,
  onChangePage
}: {
  className?: string,
  showSkeleton?: boolean,
  emptyData?: boolean,
  emptyDataText?: string,
  meta: {
    fromRow?: number,
    toRow?: number,
    totalRow?: number,
    lenghtRow?: number,
    currentPage?: number,
    totalPage?: number
  },
  minShowTableAt: 'xs' | 'sm' | 'md' | 'lg' | 'never',
  card?: React.ReactNode,
  thead?: React.ReactNode,
  tbody?: React.ReactNode,
  onChangePage?: (to: string) => void
}) {
  const bp = useBreakpoint()

  if (!bp.hasMounted) return null
  const changePage = (to: string) => {
    if (to === 'prev' && !showSkeleton && meta.current_page > 1) {
      onChangePage?.(meta.current_page - 1)
    }
    else if (to === 'next' && !showSkeleton && meta.current_page < meta.last_page) {
      onChangePage?.(meta.current_page + 1)
    }
  }

  return (
    <div>
      {(minShowTableAt === 'never' || bp.smallerThan(minShowTableAt)) &&
        <div className="grid grid-cols-12 gap-4 mb-4">
          {card}
        </div>
      }
      {(minShowTableAt !== 'never' && bp.greaterOrEqual(minShowTableAt)) &&
        <div className="sp-table">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            <div className="flex w-full rounded-md bg-gray-200 text-gray-400 font-semibold dark:bg-gray-700">
              {thead}
            </div>
            {(!emptyData && !showSkeleton) && tbody}
          </div>
        </div>
      }
      {(emptyData || showSkeleton) &&
        <div className="pb-4">
          {showSkeleton &&
            <div>
              {bp.smallerThan(minShowTableAt) &&
                <div className="overflow-hidden" style={{height: 'calc((1px * 2) + (1rem * 2) + ((1.5rem * 2) + (1rem * 1)) + (1rem + 1.5rem))'}}>
                  <div className="grid grid-cols-12 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="col-span-12 sm:col-span-6 xl:col-span-4">
                        <div className="p-4 border border-gray-400 dark:border-gray-700 rounded-md">
                          <div className="flex w-full space-x-4">
                            <Skeleton className="flex-shrink-0 h-16 w-16 rounded-md" />
                            <div className="w-full space-y-4">
                              <Skeleton className="h-6 rounded-md" />
                              <Skeleton className="h-6 w-1/3 rounded-md" />
                            </div>
                          </div>
                          <Skeleton className="h-6 w-1/4 rounded-md mt-4 ml-auto" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
              {bp.greaterOrEqual(minShowTableAt) &&
                <div className="flex items-center space-x-4 w-full p-4">
                  <Skeleton className="h-6 w-8 rounded-md" />
                  <Skeleton className="h-6 w-full rounded-md" />
                </div>
              }
            </div>
          }
          {(emptyData && !showSkeleton) &&
            <ErrorData404 className="mt-4">
              {emptyDataText}
            </ErrorData404>
          }
        </div>
      }
      {(!emptyData && meta?.from && meta?.to && meta?.total && meta?.current_page && meta?.last_page && meta?.last_page > 1) &&
        <div className="items-start justify-between w-full sm:flex">
          <div className="flex items-start justify-center divide-x divide-gray-200 dark:divide-gray-700">
            <div className="content-center h-12 px-4">
              {/*<SpNumberFormat :value="10" /> baris per halaman*/}
            </div>
            <div className="content-center h-12 px-4 border-gray-200 dark:border-gray-700">
              {/*Baris <SpNumberFormat :value="meta.from" /> - <SpNumberFormat :value="meta.to" /> dari <SpNumberFormat :value="meta.total" /> baris*/}
            </div>
          </div>
          <div className="flex items-start justify-center divide-gray-200 dark:divide-gray-700 sm:divide-x">
            <div
              tabIndex={!showSkeleton ? 0 : -1}
              className={
                `duration-300 outline-none focus:bg-gray-300 dark:focus:bg-gray-700
                ${showSkeleton ? 'cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}
              `}
              onClick={changePage('prev')}
              onKeyDown={keydownEnter(changePage('prev'))}
            >
              <div
                className={`
                  flex items-center justify-center h-12 w-12
                  ${showSkeleton ? 'cursor-not-allowed' : 'cursor-pointer click-effect'}
                `}>
                <IconSvg name="nav-arrow-left" className="h-6 w-6" />
              </div>
            </div>
            <div className="content-center h-12 px-4">
              {/*<SpNumberFormat :value="meta.current_page" /> dari <SpNumberFormat :value="meta.last_page" /> halaman*/}
            </div>
            <div
              tabIndex={!showSkeleton ? 0 : -1}
              className={`
                duration-300 outline-none focus:bg-gray-300 dark:focus:bg-gray-700
                ${showSkeleton ? 'cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}
              `}
              onClick={changePage('next')}
              onKeyDown={keydownEnter(changePage('next'))}
            >
              <div
                className={`
                  flex items-center justify-center h-12 w-12
                  ${showSkeleton ? 'cursor-not-allowed' : 'cursor-pointer click-effect'}
                `}
              >
                <IconSvg name="nav-arrow-right" className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
