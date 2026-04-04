import Card from "../components/Card";
import ContentHeader from "../components/ContentHeader";
import ContentMain from "../components/ContentMain";

export default function ClientsPage({state}) {
    const [data, setData] = state;

    return (
        <>
        <ContentHeader>
            <div style={{display: "flex", padding: "1rem", alignItems: "center"}}>
                <span style={{fontSize: "20px", fontWeight: "bold"}}> Client list view </span>
            </div>
        </ContentHeader>
        <ContentMain>
            <div style={{width: "48rem", backgroundColor: "white", borderRadius: "1rem", padding: "1rem"}}>
                <div style={{fontSize: "20px", fontWeight: "bold"}}> Clients </div>

                <table>
                    <thead>
                        <tr>
                            <th>A</th>
                            <th>B</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>A</th>
                            <th>B</th>
                        </tr>
                        <tr>
                            <th>A</th>
                            <th>B</th>
                        </tr>
                        <tr>
                            <th>A</th>
                            <th>B</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ContentMain>
        </>
    )
}