import { File } from "lucide-react"
import { ICONS } from './education-icons'


const DATA = [
    {name:"Document1.pdf",size:"1.8MB"},
    {name:"Document2.pdf",size:"1.8MB"},
    {name:"Document3.pdf",size:"1.8MB"},
]


const EducationFileTable = (file:{file:any})=>{

    return ( <table className='w-full text-[14px] text-[#8A8A8E]'>
   
    {
        DATA.map((e,index)=>( <tr className="h-[44px]  border-[#F1F5FB]/70 border-b" key={index}>
            <td className="px-3 w-[50px]" >   {ICONS.file(
                {
                    className: 'text-primary-500',
                    fill:'#8A8A8E' 
                 })}</td>
            <td className="px-3 text-xs text-left">{e.name}</td>
          </tr>))
    }
  </table>)
}

export default EducationFileTable