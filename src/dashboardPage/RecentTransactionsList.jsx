<<<<<<< HEAD
import { useCallback, useContext } from "react";
=======
import { useContext } from "react";
>>>>>>> bb0dfa2 (Added create and edit forms)
import styles from "./RecentTransactionsList.module.css";
import { AppContext } from "../App";

export function RecentTransactionsList() {

    // useContext(AppContext) is a way to store variables globally
    // Get `data` from it
    const { data } = useContext(AppContext);
    // Then you can use it
    // console.log(Object.values(data.clients))

    const getPropertyName = (property) => `${property.area} - Blk. ${property.blockNumber} Lot ${property.lotNumber}`;

    const getRecentPayments = () => {
<<<<<<< HEAD
            const out = Object.values(data.clients).flatMap(client => {
                return client.propertyIds.map(i => data.properties[i]).flatMap(property => {
                    return property.account.paymentIds.map(i => data.payments[i]).flatMap(payment => {
                        return {
                            paymentId: payment.id,
                            clientName: client.fullName,
                            date: payment.paymentDate,
                            propertyName: getPropertyName(property),
                            amount: payment.amount,
                            clientId: client.id,
                            propertyLotId: property.id
                        }
                    })
                });
            })
=======
            const out = Object.values(data.properties).flatMap(property => {
                const owner = Object.values(data.clients).find(client => client.propertyIds.includes(property.id));
                const uniquePaymentIds = Array.from(new Set(property.account?.paymentIds || []));

                return uniquePaymentIds
                    .map(i => data.payments[i])
                    .filter(Boolean)
                    .map(payment => {
                        const paymentClient = data.clients[payment.clientId] || owner;

                        return {
                            paymentId: payment.id,
                            clientName: paymentClient ? paymentClient.fullName : "Unassigned",
                            date: payment.paymentDate,
                            propertyName: getPropertyName(property),
                            amount: payment.amount,
                            clientId: paymentClient ? paymentClient.id : null,
                            propertyLotId: property.id
                        }
                    });
            });
>>>>>>> bb0dfa2 (Added create and edit forms)

            out.sort((a, b) => b.date - a.date);
    
            return out;
    };

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
<<<<<<< HEAD
                        <tr>
=======
                        <tr key={String(pym.paymentId)}>
>>>>>>> bb0dfa2 (Added create and edit forms)
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