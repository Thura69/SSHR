import { create } from "zustand"
import { devtools,persist } from "zustand/middleware"

type State = {
    location: {
        lat: number,
        lng: number,
    } | undefined
}

type Action = {
    setLocation:(location:{lat:number,lng:number})=>void
}

const useMapStore = create<State & Action>()(
    devtools(
        persist(
            (set)=>({
                location:undefined,
                setLocation:(location:{lat:number,lng:number})=>set({location:location})
            }),
            {name:'MapStore'}
        )
    )
)

export default useMapStore
