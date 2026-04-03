export default function ContentMain({children}) {
    return (
        <div style={{height: "100%", overflow: "scroll", padding: "2rem"}}>
            {children}
        </div>
    )
}