import React, {
    ChangeEvent,
    FC,
    forwardRef,
    memo,
    useEffect,
    useRef,
} from 'react'
import { OrgChart } from 'd3-org-chart'
import {
    useGetBranchOptions, useGetCompanyOptions,
    useGetLocationOptions,
} from '@/service/query-hooks/common'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import * as jspdf from 'jspdf'
import useAuthStore from '@/state/zustand/auth-store'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { useMediaQuery } from 'usehooks-ts'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import NextImage from 'next/image'
import PageLoader from '@/components/common/loaders/page-loader'
import { FilterProps, OrgChartComponentProps } from '@/types/org-structure'



/**
 * if the data structure has custom id and custom parentId
 *  .nodeId((p) => p.id)
 *  .parentNodeId((p) => p.parentId)
 * */

export const DepartmentChartComponent: FC<OrgChartComponentProps> = memo(
    forwardRef(({ data, onNodeClick, form, loading }) => {
        const d3Container = useRef<HTMLDivElement>(null)
        const CARD_WIDTH = 250
        const CARD_HEIGHT = 120
        const BRANCH_HEIGHT_FROM_PARENT_NODE = 80
        const COMPACT_TOP_TO_DOWN_MARGIN = 30
        const COMPACT_LEFT_TO_RIGHT_MARGIN = 30
        const MARGIN_BETWEEN_HORIZONTAL_MARGIN = 50
        const MARGIN_BETWEEN_COMPACT_BRANCHES = 20

        let chart: OrgChart<any> | null = null

        const { data: branchData } = useGetBranchOptions({})
        const { data: locationData } = useGetLocationOptions({})
        const { data: companyData } = useGetCompanyOptions({})

        useEffect(() => {
            if (data && d3Container.current && window) {
                if (!chart || chart === null) {
                    chart = new OrgChart<any>()
                }
                chart
                    .container(d3Container.current as any)
                    .svgHeight(window.innerHeight - 200)
                    .svgWidth(window.innerWidth - 300)
                    .data(data)
                    // node-width/height is card width and height
                    .nodeWidth((d) => CARD_WIDTH)
                    .nodeHeight((d) => CARD_HEIGHT)
                    // height of branch line from a parent node
                    .childrenMargin((d) => BRANCH_HEIGHT_FROM_PARENT_NODE)
                    // height of vertical branch (only works in compact mode)
                    .compactMarginBetween((d) => COMPACT_TOP_TO_DOWN_MARGIN)
                    // width of horizontal branch (only works in compact mode)
                    .compactMarginPair((d) => COMPACT_LEFT_TO_RIGHT_MARGIN)
                    // margin between horizontal nodes
                    .siblingsMargin((d) => MARGIN_BETWEEN_HORIZONTAL_MARGIN)
                    // space between COMPACT branches
                    .neighbourMargin((a, b) => MARGIN_BETWEEN_COMPACT_BRANCHES)
                    // .setActiveNodeCentered(false)
                    .nodeContent(function (d: any, i, arr, state) {
                        const color = '#FFFFFF'
                        const strokeColor = d.data._highlighted
                            ? '#1cbcc8'
                            : 'transparent'
                        return `
                         <div style='
                            border: 4px solid ${strokeColor};
                            border-radius: 8px;
                        '>
                        
                    <div class="node-container"  style='width:${d.width}px;
                                height:${d.height}px;
                              
                                padding-left:1px;padding-right:1px;
                                display:${d.data.id === 0 ? 'none' : 'block'};
                                pointer-events: ${d.data.id === 0 ? 'none' : 'auto'};
                                '
                           
                    >
                        <div style="font-family: 'Inter', sans-serif;
                                    background-color:${color};
                                    margin-left:-1px;
                                    width:${d.width - 8}px;
                                    height:${d.height}px;
                                    border-radius:6px;
                                    border: 1px solid #E4E2E9"
                        >
                                <div style="font-size:15px;
                                            color:#08011E;
                                            margin-left:20px;
                                            margin-top:20px"
                                >
                                    ${d.data.Request_From_Department_Name ?? ''}
                                </div> 
                        </div>
                    </div>
                        </div>    `
                    })
                    .compact(false)
                    .onNodeClick((d) => {
                        onNodeClick && onNodeClick(d)
                    })
                    .render()
            }
        }, [data, chart])

        // to hide the fake root node
        useEffect(() => {
            if (window && window.document && chart) {
                const links = document.querySelectorAll('.links-wrapper path')
                const fakeNodeActionButton = document.querySelector(
                    '.node-button-rect',
                ) as HTMLElement
                const fakeNodeForeignObj = document.querySelector(
                    '.node-button-foreign-object',
                ) as HTMLElement
                const linksArrayFromFakeNode: HTMLElement[] = []
                links.forEach((link) => {
                    data.forEach((d) => {
                        if (d.parentId === 0) {
                            const eLink = link as HTMLElement
                            linksArrayFromFakeNode.push(eLink)
                        }
                    })
                })
                linksArrayFromFakeNode.forEach((link) => {
                    link.style.opacity = '0'
                })
                fakeNodeActionButton?.remove()

                fakeNodeForeignObj.style.pointerEvents = 'none'
                fakeNodeForeignObj.style.opacity = '0'
                fakeNodeActionButton?.remove()
            }
        }, [chart, data])

        function downloadPdf(chart: any) {
            chart?.exportImg({
                save: false,
                full: false,
                onLoad: (base64: any) => {
                    const pdf = new jspdf.jsPDF()
                    const img = new Image()
                    img.src = base64
                    img.onload = function () {
                        pdf.addImage(
                            img,
                            'JPEG',
                            5,
                            0,
                            595 / 3,
                            ((img.height / img.width) * 595) / 3,
                        )
                        pdf.save('department-orgchart.pdf')
                    }
                },
            })
        }

        function exportImage(chart: any) {
            chart!.exportImg({ full: false })
        }

        const userData = useAuthStore()

        const userCompany = userData
            ? userData?.userData?.company_id
            : undefined

        useEffect(() => {
            if (!!userCompany) {
                form.setValue('company_id', userCompany)
            }
        }, [userCompany])

        const filterChart = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            if (!chart) return
            chart.clearHighlighting()
            const data = chart.data()
            if (!data) return
            data.forEach((d: any) => (d._expanded = false))
            data.forEach((d: any) => {
                if (
                    value != '' &&
                    d.Request_From_Department_Name?.toLowerCase().includes(
                        value.toLowerCase(),
                    )
                ) {
                    d._highlighted = true
                    d._expanded = true
                }
            })
            chart.data(data).render().fit()
        }

        const isMobile = useMediaQuery('(max-width:480px)')

        return (
            <section className="p-4">
                <div
                    className={
                        'relative flex flex-col lg:flex-row lg:items-center lg:justify-between flex-wrap gap-y-4'
                    }
                >
                    <div className="flex flex-col lg:flex-row gap-4">
                        <Input
                            key={!!chart + ''}
                            id={'name'}
                            className="w-full lg:w-[200px] border border-zinc-300 rounded-lg py-2 h-[40px]"
                            onChange={filterChart}
                            placeholder={'Type department name'}
                        />
                        <Form {...form}>
                            <form className="">
                                <div
                                    className={
                                        'flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4'
                                    }
                                >
                                    <FormField
                                        control={form.control}
                                        name="company_id"
                                        render={({ field }) => (
                                            <FormItem
                                                className={'min-w-[150px]'}
                                            >
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={
                                                        userCompany + ''
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select company" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {companyData?.map(
                                                            (
                                                                data: FilterProps,
                                                            ) => (
                                                                <SelectItem
                                                                    key={
                                                                        data?.id +
                                                                        data?.label
                                                                    }
                                                                    value={
                                                                        data?.id +
                                                                        ''
                                                                    }
                                                                >
                                                                    {
                                                                        data?.label
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="branch_id"
                                        render={({ field }) => (
                                            <FormItem
                                                className={'min-w-[150px]'}
                                            >
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select branch" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {branchData?.map(
                                                            (
                                                                data: FilterProps,
                                                            ) => (
                                                                <SelectItem
                                                                    key={
                                                                        data?.id +
                                                                        data?.label
                                                                    }
                                                                    value={
                                                                        data?.id +
                                                                        ''
                                                                    }
                                                                >
                                                                    {
                                                                        data?.label
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="location_id"
                                        render={({ field }) => (
                                            <FormItem
                                                className={'min-w-[150px]'}
                                            >
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select location" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {locationData?.map(
                                                            (
                                                                data: FilterProps,
                                                            ) => (
                                                                <SelectItem
                                                                    key={
                                                                        data?.id +
                                                                        data?.label
                                                                    }
                                                                    value={
                                                                        data?.id +
                                                                        ''
                                                                    }
                                                                >
                                                                    {
                                                                        data?.label
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div
                        className={cn('self-end', {
                            'absolute -top-[56px] right-0': !isMobile,
                        })}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button
                                    variant={'primary'}
                                    className="h-[40px]"
                                >
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Button
                                        size={'sm'}
                                        variant={'ghost'}
                                        className="h-[40px] flex gap-2 items-center px-4"
                                        onClick={() => exportImage(chart)}
                                    >
                                        <NextImage
                                            src="/image.png"
                                            width={20}
                                            height={20}
                                            alt="image"
                                        />
                                        Export Image
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button
                                        size={'sm'}
                                        variant={'ghost'}
                                        className="h-[40px] flex gap-2 items-center px-4"
                                        onClick={() => downloadPdf(chart)}
                                    >
                                        <NextImage
                                            src="/pdf.png"
                                            width={20}
                                            height={20}
                                            alt="pdf"
                                        />
                                        Export Pdf
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="h-full overflow-hidden">
                    {data.length === 0 ? (
                        <div
                            className={
                                'flex justify-center items-center w-full h-screen'
                            }
                        >
                            {loading ? <PageLoader /> : <p>No result</p>}
                        </div>
                    ) : (
                        <div ref={d3Container} key={'hi'} />
                    )}
                </div>
            </section>
        )
    }),
)
