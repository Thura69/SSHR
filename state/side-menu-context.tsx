import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
} from 'react'
import { useBoolean } from 'usehooks-ts'

interface SideMenuProps {
    value: boolean
    setValue: Dispatch<SetStateAction<boolean>>
    setTrue: () => void
    setFalse: () => void
    toggle: () => void
}

const defaultValue: SideMenuProps = {
    value: true,
    setValue: () => {},
    setTrue: () => {},
    setFalse: () => {},
    toggle: () => {},
}

// Create the context
const SideMenuContext = createContext<SideMenuProps | undefined>(defaultValue)

// Create the provider
interface SideMenuProviderProps {
    children: ReactNode
}

export const SideMenuProvider: React.FC<SideMenuProviderProps> = ({
    children,
}) => {
    const booleanState = useBoolean(true)

    const value: SideMenuProps = {
        value: booleanState.value,
        setValue: booleanState.setValue,
        setTrue: booleanState.setTrue,
        setFalse: booleanState.setFalse,
        toggle: booleanState.toggle,
    }

    return (
        <SideMenuContext.Provider value={value}>
            {children}
        </SideMenuContext.Provider>
    )
}

export const useSideMenuContext = () => {
    const context = useContext(SideMenuContext)

    if (!context) {
        throw new Error(
            'useSideMenuContext must be used within a SideMenuProvider',
        )
    }
    return context
}
