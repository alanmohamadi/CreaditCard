
import { Route, Routes } from "react-router"
import HomePage from "./page/HomePage"
import Layout from "./components/partial/layout/Layout"
import Login from "./page/login"


function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default App
