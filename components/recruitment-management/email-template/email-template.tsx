import LOGO from '@/public/logo.svg'
import Image from 'next/image'
import IMG_1 from './images/Frame.png'
import IMG_2 from './images/Frame(1).png'
import IMG_3 from './images/Frame(2).png'

const TemplateHeader = () => {
    return (
        <div className="flex pb-[40px] justify-between">
            <div className="flex gap-2 items-center">
                <Image className="w-[30px] h-[24px]" src={LOGO} alt="logo" />
                <p className="text-[12px] md:text-[16px] font-bold text-[#041626]">
                    Smilax Global Co., Ltd.
                </p>
            </div>
            <div className="flex gap-[10px] md:gap-[24px]">
                <Image className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] " src={IMG_1} alt="logo" />
                <Image className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] " src={IMG_2} alt="logo" />
                <Image className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] " src={IMG_3} alt="logo" />
            </div>
        </div>
    )
}

const TemplateBody = () => {
    return (
        <div className="bg-white text-[#041626] p-[40px] text-[12px] md:text-[14px] space-y-5">
            <p>Dear Antonela,</p>
            <p>
                I hope this message finds you well. We are pleased to inform you
                that after a thorough review of your application and interview,
                you have been selected to join our team at Smilax Global Co.,
                Ltd. as a UI/UX Designer Position.
            </p>
            <p>
                Your skills, experience, and enthusiasm greatly impressed us,
                and we believe you will be a valuable addition to our company.
                We are excited to work with you and see the positive impact you
                will bring to our projects.
            </p>
            <p>
                Please find attached the official offer letter outlining the
                details of your employment, including your start date, salary,
                and benefits. We kindly ask you to review the document and
                confirm your acceptance by signing and returning it by
                12.2.2024.
            </p>
            <p>
                If you have any questions or need further clarification, please
                do not hesitate to reach out to us. We are more than happy to
                assist you
            </p>
            <p>
                Once again, congratulations, and welcome to the Smilax Global
                Co., Ltd. team! We look forward to your positive response and to
                starting this exciting journey together.
            </p>
            <ul>
                <li>Best regards,</li>
                <li>Richard</li>
                <li>Managing Director</li>
                <li>Smilax Global Co., Ltd.</li>
                <li>13th floor, Yuzana Tower, Shwe Gone Tine, Yangon</li>
                <li>+95 9789456123</li>
                <li>smilaxglobal@gmail.com</li>
            </ul>
        </div>
    )
}

const TemplateFooter = ()=> {
    return (
        <div className='bg-white text-[12px]  md:text-[14px] mt-[40px]'>
              <div className="text-center px-[40px]">  
              <Image alt='logo' className="md:w-[100px] w-[70px] mb-3 mx-auto h-[55px] md:h-[77px]" src={LOGO} />
              <p className='text-[#041626]'>If you have any questions, feel free to message us at <br/><a className='text-[#3F88EC]'>support@files.design </a></p>
              
              <div className="my-5 text-[#52525B]">
                <p>All rights deserves @2024</p>
                <p>Smilax Global Co., Ltd.</p>
                <p>Innovative and enterprise software company in Myanmar established in 2012</p>
              </div>
              </div>
               
        </div>
    )
}

const EmailTemplate = () => {
    return (
        <section className='container p-0'>
           <div  className=" bg-[#F7FAFF] p-[20px] md:p-[40px]">
           <TemplateHeader />
           <TemplateBody />
           </div>
            <TemplateFooter/>
        </section>
    )
}

export default EmailTemplate
