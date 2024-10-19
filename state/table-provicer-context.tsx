'use client'

'use client'
import {
    createContext,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react'

const initialState = {
    isAllSelected: false,
}
type StateType = typeof initialState

type ProviderType = {
    tableState: StateType
    setTableState: React.Dispatch<SetStateAction<StateType>>
}

const TableContext = createContext<ProviderType | null>(null)

export const TableContextProvider = ({ children }: { children: ReactNode }) => {
    const [tableState, setTableState] = useState(initialState)
    return (
        <TableContext.Provider
            value={{
                tableState,
                setTableState,
            }}
        >
            {children}
        </TableContext.Provider>
    )
}

export const useTableContext = () => {
    const context = useContext(TableContext)
    if (!context) {
        throw new Error(
            'useTableContext must be used within a TableContextProvider',
        )
    }
    return context
}
