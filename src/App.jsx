import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SaleOrders from './pages/SaleOrders'
import { useContext } from 'react'
import { SaleOrderContext } from './contexts/SaleOrderContext'

function App() {
  const {saleOrder} = useContext(SaleOrderContext)
  console.log("From App.jsx: saleOrder", saleOrder)
  return (
    <>
      {/* <Signup /> */}
      {/* <Login /> */}
      <SaleOrders />
    </>
  )
}

export default App
