import React from "react"

const AppDataContext = React.createContext<any>(null);

export function useAppContext() {
return React.useContext(AppDataContext);
}

export default AppDataContext;