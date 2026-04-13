<<<<<<< HEAD
import React, { useContext, useMemo, useState } from "react";
=======
import { useContext, useMemo } from "react";
>>>>>>> bb0dfa2 (Added create and edit forms)
import { AppContext } from "../App";
import RecordList from "./PaymentRecordList";
import ContentMain from "../components/ContentMain";
import ContentHeader from "../components/ContentHeader";
import Card from "../components/Card";

export default function RecordsPage() {
    const { data, setCurrentPage } = useContext(AppContext);

<<<<<<< HEAD
    const [loading] = useState(false);
=======
    const loading = false;
>>>>>>> bb0dfa2 (Added create and edit forms)

    const getPropertyName = (property) => `${property.area} - Blk. ${property.blockNumber} Lot ${property.lotNumber}`;

    const payments = useMemo(() => {
<<<<<<< HEAD
        const out = Object.values(data.clients).flatMap(client => {
            return client.propertyIds.map(i => data.properties[i]).flatMap(property => {
                return property.account.paymentIds.map(i => data.payments[i]).flatMap(payment => {
                    return {
                        id: payment.id,
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
                        id: payment.id,
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

        out.sort((a, b) => new Date(b.date) - new Date(a.date));

        return out;
    }, [data]);

<<<<<<< HEAD
    // Updated handleView: navigate to PaymentDetail page
    const handleView = (id) => {
        setCurrentPage({ name: 'paymentDetail', params: { paymentId: id } });
    };

    const handleEdit = (id) => {
        // implement editing
    };

    return (
        <>
            <ContentHeader>
                <div style={{display: "flex", padding: "1rem", alignItems: "center"}}>
                    <span style={{fontSize: "20px", fontWeight: "bold"}}> Dashboard </span>
=======
    // Intentionally no-op for now; detail implementation is handled by a separate teammate.
    const handleView = () => {};

    const handleCreate = () => {
        setCurrentPage({ name: 'createPayment', params: {} });
    };

    const handleEdit = () => {
        // implement editing
    };

    const handleDelete = (paymentId) => {
        if (!window.confirm(`Delete payment ${paymentId}?`)) {
            return;
        }

        data.deletePayment(paymentId);
    };

    return (
        <>
            <ContentHeader>
                <div style={{display: "flex", padding: "1rem", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                    <span style={{fontSize: "20px", fontWeight: "bold"}}> Payments </span>
                    <button onClick={handleCreate} style={{ padding: "0.5rem 0.9rem", fontWeight: "bold" }}>New Payment</button>
>>>>>>> bb0dfa2 (Added create and edit forms)
                </div>
            </ContentHeader>

            <ContentMain>
                {/* <div style={{ padding: "1rem" }}> */}
                <Card>
                    <RecordList
                        records={payments}
                        recordType="payments"
                        loading={loading}
                        onView={handleView}
<<<<<<< HEAD
                        onEdit={handleEdit} 
=======
                        onEdit={handleEdit}
                        onDelete={handleDelete}
>>>>>>> bb0dfa2 (Added create and edit forms)
                    />
                </Card>
                {/* </div> */}
            </ContentMain>
        </>
    );
}