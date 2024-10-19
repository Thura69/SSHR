import { Button } from "@/components/ui/button"

const LoadButton = ({disabled,title,handleClick}:{disabled:boolean,title:string,handleClick?:any})=>{

    return <Button loading={disabled} onClick={handleClick}  variant={'primary'} className="w-full  rounded-[8px]  h-[40px] disabled:bg-buttonDisabled  bg-primary-500 ">{title}</Button>
}

export default LoadButton;