import styles from "./Sidebar.module.css"

// Supposed to be clickable and would take you to another page, but that is not implemented yet.

export default function Sidebar() {
    return (
        <>
            <div className={styles["sidebar"]}>
                <div className={styles["sidebarPanel"]}>
                    <span style={{"font-size": "24px", "color": "var(--accent)", "font-weight": "bold"}}> App Name Here </span>
                    <SidebarTab Icon={TemporaryIconPlaceholder}> Tab 1 </SidebarTab>
                    <SidebarTab Icon={TemporaryIconPlaceholder}> Tab 2 </SidebarTab>
                    <SidebarTab Icon={TemporaryIconPlaceholder}> Tab 3 </SidebarTab>
                </div>
            </div>
        </>
    );
}

function TemporaryIconPlaceholder() {
    return (
        <div style={{display: "inline", minHeight: "48px", minWidth: "48px", backgroundColor: "green"}}>
            icon
        </div>
    )
}

function SidebarTab({Page, Icon, children}) {
    const onClick = () => {
        
    }

    return (
        <div className={styles["sidebarTab"]}>
            <Icon/>
            {children}
        </div>
    )
}
