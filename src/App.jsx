import { useEffect, useState } from 'react'
import './index.css'
import Content from './layout/Content'
import Sidebar from './layout/Sidebar'
import ClientsPage from './clientsPage/ClientsPage';

export default function App() {
    const dataState = useState({});
    const [data, setData] = dataState;

    useEffect(() => {
        const jsonData = localStorage.getItem("data")
        setData(JSON.parse(jsonData));
    }, []);

    return (
        <div style={{display: "flex", alignItems: "stretch", height: "100vh", width: "100vw", maxHeight: "100vh"}}>
            <Sidebar/>
            <Content>
                <ClientsPage></ClientsPage>
            </Content>
        </div>
    )
}
