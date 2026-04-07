export default function ContentMain({children}) {
    return (
        <div style={{height: "100%", overflow: "auto", padding: "2rem"}}>
            {children}
        </div>
    )
}