import { useCallback, useContext } from "react";
import styles from "./RecentTransactionsTable.module.css";
import { AppContext } from "../App";

export function RecentTransactionsTable() {

    const { data } = useContext(AppContext);

    const getRecentPayments = useCallback(() => {
        const unsorted = data.getAllClients().flatMap(client => {
            return client.getProperties().flatMap(property => {
                return property.getPayments().flatMap(payment => {
                    return {
                        paymentId: payment.id,
                        clientName: client.fullName,
                        date: payment.paymentDate,
                        propertyName: property.getDisplayName(),
                        amount: payment.amount
                    }
                })
            });
        });
        
        return unsorted.sort((p1, p2) => p1.date < p2.date);
    });

    const recentPayments = getRecentPayments();

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