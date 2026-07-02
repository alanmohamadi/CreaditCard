
import { Route, Routes } from "react-router"

import { AuthProvider } from "./core/provider/AuthContext";
import Layout from "./components/partial/layout/Layout";
import HomePage from "./page/HomePage";


export default function App() {
    return (
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Layout><div /></Layout>} />
                    <Route path="/" element={<Layout><HomePage /></Layout>} />
                    <Route path="/HomePage" element={<Layout><HomePage /></Layout>} />
                </Routes>
            </AuthProvider>
    );
}