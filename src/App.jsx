<<<<<<< HEAD
import { createContext, useEffect, useState } from 'react'
=======
import { createContext, useState } from 'react'
>>>>>>> bb0dfa2 (Added create and edit forms)
import './index.css'
import Content from './layout/Content'
import Sidebar from './layout/Sidebar'
import DashboardPage from './dashboardPage/DashboardPage';
import RecordsPage from './recordsPage/RecordsPage';
import PaymentDetail from './recordsPage/PaymentDetail';
<<<<<<< HEAD
import { loadData, saveToStorage } from './data';
import PropertiesPage from './propertiesPage/PropertiesPage';
import { useAppData } from './useAppData';
=======
import { loadData } from './data';
import PropertiesPage from './propertiesPage/PropertiesPage';
import { useAppData } from './useAppData';
import CreatePaymentForm from './recordsPage/CreatePaymentForm';
import CreatePropertyForm from './propertiesPage/CreatePropertyForm';
import PropertyDetail from './propertiesPage/PropertyDetail';
import EditPropertyForm from './propertiesPage/EditPropertyForm';
import ClientsPage from './clientsPage/ClientsPage';
import CreateClientForm from './clientsPage/CreateClientForm';
import EditClientForm from './clientsPage/EditClientForm';
>>>>>>> bb0dfa2 (Added create and edit forms)

/**
 * @typedef {Object} AppContextValue
 * @property {ReturnType<typeof useAppData>} data
 * @property {(arg0: string) => void} setCurrentPage 
 */

/**
 * @type {React.Context<AppContextValue>}
 */
export const AppContext = createContext(
    /** @type {AppContextValue} */ ({})
);

export default function App() {
    const data = useAppData(loadData());

    const [currentPage, setCurrentPage] = useState({ name: 'dashboard', params: {} });

    const pageToRender = () => {
        switch (currentPage.name) {
            case 'dashboard':
                return <DashboardPage />;
<<<<<<< HEAD
=======
            case 'clients':
                return <ClientsPage />;
>>>>>>> bb0dfa2 (Added create and edit forms)
            case 'properties':
                return <PropertiesPage />;
            case 'payments':
                return <RecordsPage />;
            case 'paymentDetail':
                return <PaymentDetail paymentId={currentPage.params.paymentId} />;
<<<<<<< HEAD
=======
            case 'createClient':
                return <CreateClientForm />;
            case 'editClient':
                return <EditClientForm clientId={currentPage.params.clientId} />;
            case 'createPayment':
                return <CreatePaymentForm />;
            case 'createProperty':
                return <CreatePropertyForm />;
            case 'propertyDetail':
                return <PropertyDetail propertyId={currentPage.params.propertyId} />;
            case 'editProperty':
                return <EditPropertyForm propertyId={currentPage.params.propertyId} />;
>>>>>>> bb0dfa2 (Added create and edit forms)
            default:
                return <DashboardPage />;
        }
    };

    return (
            <AppContext.Provider value={{data, currentPage, setCurrentPage}}>
                <div style={{display: "flex", alignItems: "stretch", height: "100vh", width: "100vw", maxHeight: "100vh"}}>
                        <Sidebar/>
                        <Content>
                            {pageToRender()}
                        </Content>
                </div>
            </AppContext.Provider>
    )
}
