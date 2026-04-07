import { useCallback, useContext } from "react";
import styles from "./RecentTransactionsTable.module.css";
import { AppContext } from "../App";

export function RecentTransactionsTable() {

    const {dataState, CurrentPage} = useContext(AppContext);

    const [data, setData] = dataState;

    // Goes through each payment in each ledger account. Then sorts by date/time in descending order.
    const getRecentPayments = useCallback(() => {
        const unsortedPayments = [];
        
        for (const [clientId, client] of Object.entries(data)) {
            for (const [propertyLotId, propertyLot] of Object.entries(client.propertyLots)) {
                for (const [paymentId, payment] of Object.entries(propertyLot.account.payments)) {
                    unsortedPayments.push({
                        paymentId: paymentId,
                        clientName: client.fullName,
                        date: payment.paymentDate,
                        propertyName: "placeholder",
                        amount: payment.amount
                    });
                }
            }
        }
        
        return unsortedPayments.sort((p1, p2) => p1.date < p2.date);
    });

    const recentPayments = getRecentPayments()

    return (
        <table className={styles["recentTransactionsTable"]}>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Client</td>
                    <td>Date</td>
                    <td>Property</td>
                    <td>Amount</td>
                </tr>
            </thead>
            <tbody>
                {
                    recentPayments.map(pym => (
                        <tr>
                            <td>{pym.paymentId}</td>
                            <td>{pym.clientName}</td>
                            <td>{new Date(pym.date).toLocaleString()}</td>
                            <td>{pym.propertyName}</td>
                            <td>{pym.amount}</td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}