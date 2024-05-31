import { createContext, useState } from "react";

const SaleOrderContext = createContext()

const SaleOrderContextProvider = ({children}) => {
    const [saleOrder, setSaleOrder] = useState(null)

    return (
        <SaleOrderContext.Provider value={{saleOrder, setSaleOrder}}>
            {children}
        </SaleOrderContext.Provider>
    )
}

export {SaleOrderContext, SaleOrderContextProvider};