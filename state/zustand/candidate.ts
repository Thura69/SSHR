import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


type State = {
  stepOne: any | undefined
  education: any | undefined
  qualification: any | undefined
  language: any | undefined
  skillProfess: any | undefined
  careerHistory: any | undefined
  referees:any | undefined
}

type Actions = {

  setStepOne: (data: object) => void,
  setEducation: (data: object) => void,
  setQualification: (data: object) => void,
  setLanguage: (data: object) => void,
  setSkillProfess: (data: object) => void,
  setCareerHistory: (data: object) => void,
  setReferees:(data:object)=> void
}

const useCandidateStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        stepOne: undefined,
        education: [],
        qualification: [],
        language: [],
        skillProfess: [],
        careerHistory: [],
        referees:[],
        setStepOne: (data: object) => set({ stepOne: data }),
        setEducation: (data: object) => set((state) => ({
          education: [...state.education, data]
        })),
        setQualification: (data: object) => set((state) => ({
          qualification: [...state.qualification, data]
        })),
        setLanguage: (data: object) => set((state) => ({
          language: [...state.language, data]
        })),
        setSkillProfess: (data: object) => set((state) => ({
          skillProfess: [...state.skillProfess, data]
        })),
        setCareerHistory: (data: object) => set((state) => ({
          careerHistory: [...state.careerHistory, data]
        })),
        setReferees:(data:object)=>set((state)=>({
          referees:[...state.referees,data]
        }))
      }),
      { name: 'CandidateStore' }
    )
  )
)

export default useCandidateStore;