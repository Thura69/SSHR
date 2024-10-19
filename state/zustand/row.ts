import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


type State = {
    rowOpen:{id:number | undefined,state:boolean},
}

type Actions = {
    setOpenType:(id:number,state:boolean)=>void
}

const useRowOpenStore = create<State & Actions>()(
    devtools((set)=>({
        rowOpen:{id:undefined,state:false},
        setOpenType: (id,state) => set({rowOpen:{id,state}})
    }))
)

export default useRowOpenStore;