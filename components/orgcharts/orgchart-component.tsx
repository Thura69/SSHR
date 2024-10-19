import React, {
    ChangeEvent,
    FC,
    forwardRef,
    memo,
    useEffect,
    useRef,
} from 'react'
import { OrgChart } from 'd3-org-chart'
import { Input } from '@/components/ui/input'
import {
    useGetBranchOptions,
    useGetCompanyOptions,
    useGetDepartmentOptions,
    useGetLocationOptions,
} from '@/service/query-hooks/common'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import * as jsPDF from 'jspdf'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import NextImage from 'next/image'
import { useQueryState } from 'nuqs'
import { OrgChartComponentProps, FilterProps } from '@/types/org-structure'

/**
 * if the data structure has custom id and custom parentId
 *  .nodeId((p) => p.id)
 *  .parentNodeId((p) => p.parentId)
 * */

export const OrgchartComponent: FC<OrgChartComponentProps> = memo(
    forwardRef(({ data, onNodeClick, form, loading }) => {
        const d3Container = useRef<HTMLDivElement>(null)
        const CARD_WIDTH = 330
        const CARD_HEIGHT = 150
        const BRANCH_HEIGHT_FROM_PARENT_NODE = 60
        const COMPACT_TOP_TO_DOWN_MARGIN = 35
        const COMPACT_LEFT_TO_RIGHT_MARGIN = 30
        const MARGIN_BETWEEN_HORIZONTAL_MARGIN = 50
        const MARGIN_BETWEEN_COMPACT_BRANCHES = 20

        let chart: OrgChart<any> | null = null
        const { data: branchData } = useGetBranchOptions({})
        const { data: locationData } = useGetLocationOptions({})
        const { data: companyData } = useGetCompanyOptions({})
        const { data: departmentData } = useGetDepartmentOptions({})

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
                    .setActiveNodeCentered(false)
                    .nodeContent(function (d: any, i, arr, state) {
                        const color = '#FFFFFF'
                        const imageDiffVert = 25 + 2
                        const strokeColor = d.data._highlighted
                            ? '#1cbcc8'
                            : 'transparent'
                        return `
                        <div style='
                            border: 4px solid ${strokeColor};
                            border-radius: 5px;
                        '>
                            <div  style='width:${d.width}px;
                                height:${d.height}px;
                                padding-top:${imageDiffVert - 2}px;
                                padding-left:1px;padding-right:1px;
                                display:${d.data.id === 0 ? 'none' : 'block'};
                                pointer-events: ${d.data.id === 0 ? 'none' : 'auto'};
                                '
                    >
                        <div style="font-family: 'Inter', sans-serif;
                                    background-color:${color};
                                    margin-left:-1px;
                                    width:${d.width - 9}px;
                                    height:${d.height - imageDiffVert}px;
                                    border-radius:10px;
                                    border: 1px solid #efefef"
                        >
                                <div style="background-color:${color};
                                            margin-top:${-imageDiffVert - 5}px;
                                            margin-left:${15}px;
                                            border-radius:100px;
                                            width:50px;
                                            height:50px;"
                                >
                                </div>
                                <div style='margin-top:${-imageDiffVert - 20}px'>   
                                    <img crossorigin="anonymous" src="${
                                        d.data.ePhoto
                                            ? `http://82.208.22.253:9000/uploads${d.data.ePhoto}`
                                            : '/default_profile.jpeg'
                                    }" style="margin-left:${20}px;
                                                                border-radius:100px;
                                                                width:40px;
                                                                height:40px;" 
                                    />
                                </div>
                                <div style="
                                            margin-left:20px;
                                            margin-top:10px;"
                                >
                                    <div style="display:flex; font-size:15px; color:#08011E; margin-bottom:3px">
                                         <div style="margin-right:10px">Name:</div> ${d.data.Employee_Name ?? ''}
                                    </div>
                                     <div style="display:flex; font-size:15px; color:#08011E; margin-bottom:3px">
                                          <div style="margin-right:10px">Position:</div> ${d.data.Position_Name}
                                    </div>
                                    
                                    <div style="display:flex; font-size:15px; color:#08011E;">
                                         <div style="margin-right:10px">Branch:</div> ${d.data.Branch_Name}
                                    </div>
                                    <div style="display:flex; font-size:15px; color:#08011E; margin-bottom:3px">
                                          <div style="margin-right:10px; display: inline;">Department:</div> ${d.data.Department_Name}
                                    </div>
                                </div>
                                
                        </div>
                    </div>
                        </div>
                        `
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

        function filterChart(e: ChangeEvent<HTMLInputElement>) {
            // Get input value
            const value = e.target.value

            if (!chart) return

            // Clear previous highlighting
            chart.clearHighlighting()

            // Get chart nodes
            const data = chart.data()

            if (!data) return

            // Mark all previously expanded nodes for collapse
            data.forEach((d: any) => (d._expanded = false))

            // Loop over data and check if input value matches any name
            data.forEach((d: any) => {
                if (
                    value != '' &&
                    d.Employee_Name?.toLowerCase().includes(value.toLowerCase())
                ) {
                    // If matches, mark node as highlighted
                    d._highlighted = true
                    d._expanded = true
                }
            })

            // Update data and rerender graph
            chart.data(data).render().fit()
        }

        function downloadPdf(chart: any) {
            chart?.exportImg({
                save: false,
                full: false,

                onLoad: (base64: any) => {
                    const pdf = new jsPDF.jsPDF()
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
                        pdf.save('employee-orgchart.pdf')
                    }
                },
            })
        }

        function exportImage(chart: any) {
            chart!.exportImg({ full: false })
        }

        const isMobile = useMediaQuery('(max-width:480px)')
        const [companyId] = useQueryState('company_id')

        return (
            <section className={cn('p-4')}>
                <div
                    className={
                        'w-full flex flex-col lg:flex-row lg:items-center justify-between flex-wrap gap-y-4 relative'
                    }
                >
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                        <Input
                            key={!!chart + ''}
                            id={'name'}
                            className="w-full lg:w-[200px] border border-zinc-300 rounded-lg py-2 h-[40px]"
                            onChange={filterChart}
                            placeholder={'Type employee name'}
                        />
                        <Form {...form}>
                            <form>
                                <div
                                    className={
                                        'flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4'
                                    }
                                >
                                    <FormField
                                        control={form.control}
                                        name="company_id"
                                        defaultValue={'' + companyId}
                                        render={({ field }) => (
                                            <FormItem
                                                className={'min-w-[150px]'}
                                            >
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={
                                                        companyId + ''
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
                                        name="department_id"
                                        render={({ field }) => (
                                            <FormItem
                                                className={'min-w-[200px]'}
                                            >
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select department" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {departmentData?.map(
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
                    {!data || data.length === 0 ? (
                        <div
                            className={
                                'flex justify-center items-center w-full h-screen'
                            }
                        >
                            {loading ? <p>Loading...</p> : <p>No result</p>}
                        </div>
                    ) : (
                        <div ref={d3Container} key={'hi'} />
                    )}
                </div>
            </section>
        )
    }),
)
