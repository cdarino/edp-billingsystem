import styles from "./Sidebar.module.css"

export default function Sidebar() {
    return (
        <>
            <div className={styles["sidebar"]}>
                <div className={styles["sidebarPanel"]}>
                    <span style={{"font-size": "24px", "color": "var(--accent)", "font-weight": "bold"}}> App Name Here </span>
                    <SidebarTab Icon={TemporaryIconPlaceholder}> Tab 1 </SidebarTab>
                </div>
            </div>
        </>
    );
}

function TemporaryIconPlaceholder() {
    return (
        <>
            icon
        </>
    )
}

function SidebarTab({Icon, children}) {
    return (
        <div>
            <Icon/>
            {children}
        </div>
    )
}
