import { useContext } from "react";
import styles from "./Sidebar.module.css";
import { AppContext } from "../App";

export default function Sidebar() {
    const { setCurrentPage } = useContext(AppContext);

    return (
        <>
            <div className={styles["sidebar"]}>
                <div className={styles["sidebarPanel"]}>
                    <span style={{ fontSize: "24px", color: "var(--accent)", fontWeight: "bold" }}> App Name Here </span>
<<<<<<< HEAD
                    <SidebarTab onClick={() => setCurrentPage({ name: 'dashboard' })} Icon={TemporaryIconPlaceholder}> Dashboard </SidebarTab>
                    <SidebarTab onClick={() => setCurrentPage({ name: 'properties' })} Icon={TemporaryIconPlaceholder}> Properties </SidebarTab>
                    <SidebarTab onClick={() => setCurrentPage({ name: 'payments' })} Icon={TemporaryIconPlaceholder}> Payments </SidebarTab>
                    <SidebarTab onClick={() => setCurrentPage({ name: 'about' })} Icon={TemporaryIconPlaceholder}> About </SidebarTab>
=======
                    <SidebarTab onClick={() => setCurrentPage({ name: 'dashboard' })} icon={TemporaryIconPlaceholder}> Dashboard </SidebarTab>
                    <SidebarTab onClick={() => setCurrentPage({ name: 'clients' })} icon={TemporaryIconPlaceholder}> Clients </SidebarTab>
                    <SidebarTab onClick={() => setCurrentPage({ name: 'properties' })} icon={TemporaryIconPlaceholder}> Properties </SidebarTab>
                    <SidebarTab onClick={() => setCurrentPage({ name: 'payments' })} icon={TemporaryIconPlaceholder}> Payments </SidebarTab>
                    <SidebarTab onClick={() => setCurrentPage({ name: 'about' })} icon={TemporaryIconPlaceholder}> About </SidebarTab>
>>>>>>> bb0dfa2 (Added create and edit forms)
                </div>
            </div>
        </>
    );
}

function TemporaryIconPlaceholder() {
    return (
        <div style={{ display: "inline", minHeight: "48px", minWidth: "48px", backgroundColor: "green" }}>
            icon
        </div>
    )
}

<<<<<<< HEAD
function SidebarTab({ onClick, Icon, children }) {
    return (
        <div className={styles["sidebarTab"]} onClick={onClick}>
            <Icon />
=======
function SidebarTab({ onClick, icon, children }) {
    const IconComponent = icon;

    return (
        <div className={styles["sidebarTab"]} onClick={onClick}>
            {IconComponent ? <IconComponent /> : null}
>>>>>>> bb0dfa2 (Added create and edit forms)
            {children}
        </div>
    )
}
