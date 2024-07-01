import { Outlet } from "react-router-dom"
import Footer from "../component/Footer"
import Header from "../component/Header"
import Navbar from "../component/Navbar"

const Layout = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <Navbar />
                <div className="flex-grow bg-gray">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout