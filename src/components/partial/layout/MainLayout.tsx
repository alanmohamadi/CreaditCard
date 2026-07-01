
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useHeaderAction } from '../../../core/provider/HeaderActionProvider/HeaderAction';
import { Bell } from 'lucide-react';

interface MainLayoutProps {
    showFooter?: boolean;
    navItems?: Array<{
        icon: React.ReactNode;
        label: string;
        path: string;
    }>;
}

export default function MainLayout({
    navItems = []
}: MainLayoutProps) {
    const { action } = useHeaderAction();
    const location = useLocation();
    const noFooterRoutes = [
        "/customer/profile/logout",
        "/customer/profile/questions",
        "/customer/profile/rules",
        "/customer/profile/about",
        "/customer/profile/logout",
        "/customer/profile/editeProfile",
        "/customer/revenues/customer-reports",
        "/customer/revenues/register-marketer",
        "/customer/revenues/register-marketer/additional-info",
        "/customer/card-request",
        "/customer/repots",
        "/customer/revenues/add-customer",
        "/customer/revenues/add-customer/data-bank",
        "/customer/revenues/add-customer/data-insurance",
    ];

    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            navigate('/login', { replace: true })

        } catch (error) {
            console.error("خطا در خروج:", error)
        } finally {
            setIsLoggingOut(false)
            setIsOpen(false)
        }
    }

    const showFooter = !noFooterRoutes.some(route => location.pathname.startsWith(route));
    return (
        <div className="w-full max-w-[450px] 3xl:max-w-[504px] h-dvh bg-gray-200  overflow-hidden relative flex flex-col rounded-none  border-0 md:border border-gray-200 mx-auto">

            <header className="h-14 shrink-0 bg-gray-200 flex items-center justify-between px-4 z-10">
                {!action ? (
                    <>
                        <div className="flex items-center gap-2">
                            <div className=" rounded-lg flex items-center justify-">
                                <img src="/app/assets/images/logo.png" className='w-[19%]' alt="" />
                            </div>
                        </div>
                        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell className="w-6 h-6 text-brand-700" />
                        </button>
                    </>
                ) : (
                    <div className="flex-1">{action}</div>
                )}
            </header>

            <main className="flex-1  min-h-0 rounded-t-2xl overflow-y-auto no-scrollbar bg-white scroll-smooth">
                <div className={`${showFooter ? 'pb-14' : 'pb-4'} h-full p-4`}>
                    <Outlet />
                </div>
                {/* {showFooter && <BottomNavigation items={CUSTOMER_NAV_ITEMS} />} */}
            </main>
        </div>
    );
}