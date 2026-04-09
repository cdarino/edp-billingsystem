import { createContext, useEffect, useState } from 'react'
import './index.css'
import Content from './layout/Content'
import Sidebar from './layout/Sidebar'
import DashboardPage from './dashboardPage/DashboardPage';
import RecordsPage from './recordsPage/RecordsPage';
import PaymentDetail from './recordsPage/PaymentDetail';
import { loadData, saveToStorage } from './data';

// "Global" values like current page, data, should be stored here
export const AppContext = createContext({
    data: loadData(),
    CurrentPage: null,
});

export default function App() {
    const [data, setData] = useState(loadData());

    const [CurrentPage, setCurrentPage] = useState(DashboardPage);

    return (
            <AppContext.Provider value={{dataState, currentPage, setCurrentPage}}>
                <div style={{display: "flex", alignItems: "stretch", height: "100vh", width: "100vw", maxHeight: "100vh"}}>
                        <Sidebar/>
                        <Content>
                            {pageToRender()}
                        </Content>
                </div>
            </AppContext.Provider>
    )
}
