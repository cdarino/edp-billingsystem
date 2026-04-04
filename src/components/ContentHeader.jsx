export default function ContentHeader({children}) {
    const style = {
        display: "flex",
        flex: "4rem 0 0", 
        backgroundColor: "var(--primary-background)", 
        borderBottom: "1px solid var(--accent)"
    };

    return (
        <div style={style}>
            {children}
        </div>
    )
}