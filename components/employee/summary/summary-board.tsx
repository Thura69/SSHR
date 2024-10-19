import { COLORS } from '@/constants'
import { Upload, Progress, UploadFile } from 'antd'

const SummaryBoard = ({
    data,
}: {
    data: { title: string; value: string | number }[]
}) => {
    return (
        <div className="bg-[#F2F8FD] flex flex-col md:gap-0 gap-[24px] md:space-y-8 p-6 md:h-[200px] w-full mb-5 rounded-3xl">
            <div className="flex  justify-between  gap-[24px] w-full">
                <div className="w-full lg:w-[calc(50%-20px)]  space-y-1">
                    <h3 className="text-[14px] text-primary-500 font-bold">
                        {data[0].title}
                    </h3>

                    {typeof data[0].value === 'number' ? (
                        <Progress
                            strokeColor={COLORS.primary[500]}
                            showInfo={true}
                            //@ts-ignore
                            percent={data[0].value}
                        />
                    ) : (
                        <p className="text-[16px] text-sideMenuTextColor2">
                            {data[0].value}
                        </p>
                    )}
                </div>
            </div>

            <div className=" flex  flex-col md:flex-row  justify-between  gap-[24px] w-full">
                <div className="w-full space-y-1">
                    <h3 className="text-[14px] text-primary-500 font-bold">
                        {data[1].title}
                    </h3>
                    {typeof data[1].value === 'number' ? (
                        <Progress
                            strokeColor={COLORS.primary[500]}
                            showInfo={true}
                            //@ts-ignore
                            percent={data[1].value}
                        />
                    ) : (
                        <p className="text-[16px] text-sideMenuTextColor2">
                            {data[1].value}
                        </p>
                    )}
                </div>
                <div className="w-full space-y-1">
                    <h3 className="text-[14px] text-primary-500 font-bold">
                        {data[2].title}
                    </h3>
                    {typeof data[2].value === 'number' ? (
                        <Progress
                            strokeColor={COLORS.primary[500]}
                            showInfo={true}
                            //@ts-ignore
                            percent={data[2].value}
                        />
                    ) : (
                        <p className="text-[16px] text-sideMenuTextColor2">
                            {data[2].value}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SummaryBoard
