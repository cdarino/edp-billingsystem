import { FaHome, FaUsers, FaBuilding, FaMoneyBill, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import styles from "./Sidebar.module.css";
import { AppContext } from "../App";

export default function Sidebar() {
    const { session, setCurrentPage } = useContext(AppContext);

    return (
        <>
            <div className={styles["sidebar"]}>
                <div className={styles["sidebarPanel"]}>
                    <img width={180} src="/logo.png"></img>

                    <SidebarTab activePage="dashboard" onClick={() => setCurrentPage({ name: 'dashboard' })} icon={FaHome}> Dashboard </SidebarTab>

                    <SidebarTab activePage="client" onClick={() => setCurrentPage({ name: 'clients' })} icon={FaUsers}> Clients </SidebarTab>

                    <SidebarTab activePage="propert" onClick={() => setCurrentPage({ name: 'properties' })} icon={FaBuilding}> Properties </SidebarTab>

                    <SidebarTab activePage="payment" onClick={() => setCurrentPage({ name: 'payments' })} icon={FaMoneyBill}> Payments </SidebarTab>

                    <SidebarTab activePage="about" onClick={() => setCurrentPage({ name: 'about' })} icon={FaInfoCircle}> About </SidebarTab>
                    
                </div>
                <div className={styles["bottomPanel"]}>
                    <span> Hello, {session.current.username} ({session.current.email}) </span>
                    <button className="flex items-center gap-2" onClick={() => session.signOut()}>
                        <FaSignOutAlt/> Log out
                    </button>
                </div>
            </div>
        </>
    );
}

function SidebarTab({ onClick, icon, children, activePage }) {
    const IconComponent = icon;

    const { currentPage } = useContext(AppContext);

    const isActive = (page) => page.toLowerCase().includes(activePage); 

    const iconStyle = (page) => {
        if (isActive(page)) {
            return {
                color: "var(--accent)",
                fontSize: "24px"
            }
        } else {
            return {
                fontSize: "24px"
            }
        }
    };

    const textStyle = (page) => {
        if (isActive(page)) {
            return {
                fontWeight: "bold"
            }
        } else {
            return {
                color: "gray"
            }
        }
    }

    return (    
        <div className={styles["sidebarTab"]} onClick={onClick}>
            {IconComponent ? <IconComponent style={iconStyle(currentPage.name)} /> : null}
            <span style={textStyle(currentPage.name)}> {children} </span>
        </div>
    )
}
