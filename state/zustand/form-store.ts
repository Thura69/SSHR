// store.js
import {create} from 'zustand';

type State = {
    isSubmitting: boolean | undefined,
    formInputName : any[] ,
    activeFinancial:{name:string,id:number | undefined} | undefined,
    currentFinancial:{label:string,value:number | undefined} | undefined,
    isUpdate:boolean | undefined,
    currentFinancialYear:number | undefined,
};

type Actions = {
    setIsSubmitting:(value:boolean)=>void,
    setIsUpdate:(value:boolean)=>void,
    setFormInputName:(value:string | undefined)=>void,
    removeFormInputName:(value:string | undefined) => void,
    setResetFormInput:(value:[] | undefined)=> void,
    setActiveFinancial:(value:{name:string,id:number} | undefined) => void,
    setCurrentFinancial:(value:{label:string,value:number} | undefined) => void,
    setCurrentFinancialYear:(value:number | undefined )=> void,
}

const useFormStore = create<State & Actions>((set) => ({
  isSubmitting: false,
  isUpdate:false,
  currentFinancialYear:undefined,
  setIsSubmitting: (value) => set({ isSubmitting: value }),
  formInputName:[],
  setFormInputName: (value) => {
    set((state) => {
        if (value !== undefined && !state.formInputName.includes(value)) {
            return { formInputName: [...state.formInputName, value] };
        }
        return state; 
    });
},
 removeFormInputName : (value) => {
    set((state) => {
        if (value !== undefined && state.formInputName.includes(value)) {
            const updatedFormInputName = state.formInputName.filter(item => item !== value);
            return { formInputName: updatedFormInputName };
        }
        return state; 
    });
},
  setResetFormInput:(value)=>set({formInputName:value}),
  setCurrentFinancialYear:(value)=>set({currentFinancialYear:value}),
  activeFinancial:{name:'',id:undefined},
  setActiveFinancial:(value)=>set({activeFinancial:value}),
  currentFinancial:{label:'',value:undefined},
  setCurrentFinancial:(value)=>set({currentFinancial:value}),
  setIsUpdate:(value) => set({ isUpdate: value })
}));

export default useFormStore;
