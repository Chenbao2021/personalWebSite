import React, {useReducer} from 'react'
import { initialState, AppReducer } from "./AppReducer"
import AppDataContext from './AppContext'
import { useMediaQuery } from '@mui/material';

export function AppProvider({children}: {children: React.ReactNode}) {
    const [appData, dispatch ] = useReducer(AppReducer, initialState);
    const mobileVersion = useMediaQuery('(min-width:500px)')
    return (
        <AppDataContext.Provider value={{appData, dispatch, mobileVersion}}>
            {children}
        </AppDataContext.Provider>
    )
}
