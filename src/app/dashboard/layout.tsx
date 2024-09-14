import "../globals.css";
// import { isSuperAdmin } from "@/lib/auth";

export const metadata = {
    title: "Dashboard - Expenso",
    description: "Know the insights from the top-level dashboard",
};

export default function RootLayout({ children, balance, expenses, revenue, order, yearlyStats, profile }: any) {
    //   const superAdmin = isSuperAdmin();

    return (
        <div className="flex flex-col h-screen">
            {children}
            <div className="flex">
                {order}
                {balance}
                {expenses}
                {revenue}

            </div>
            <div className="flex w-full">
                <div className="w-[600px] ">
                    {yearlyStats}
                </div>
                <div className="w-[400px]">
                    {profile}
                </div>
            </div>



        </div>
    );
}