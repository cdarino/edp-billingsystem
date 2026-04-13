<<<<<<< HEAD
import { useState, useCallback, useEffect } from 'react';
import { saveToStorage } from './data';

/**
 * @param {import('./data').RootData} data
 */

=======
import { useCallback, useEffect, useState } from 'react';
import { saveToStorage } from './data';

function getUniqueIds(ids = []) {
    return Array.from(new Set((ids || []).map(Number).filter(id => !Number.isNaN(id))));
}

function getPropertyTotalPrice(property) {
    const accountTotal = Number(property?.account?.totalPrice);
    if (!Number.isNaN(accountTotal) && accountTotal > 0) {
        return accountTotal;
    }

    const computed = Number(property?.areaInSqm || 0) * Number(property?.pricePerSqm || 0);
    return Number.isNaN(computed) ? 0 : computed;
}

function getTotalPaid(paymentIds, payments) {
    return getUniqueIds(paymentIds).reduce((sum, id) => sum + Number(payments[id]?.amount || 0), 0);
}

function getLastPaymentClientId(paymentIds, payments) {
    const clientIds = getUniqueIds(paymentIds)
        .map(id => payments[id]?.clientId)
        .filter(id => id !== undefined && id !== null)
        .map(Number)
        .filter(id => !Number.isNaN(id));

    return clientIds.length > 0 ? clientIds[clientIds.length - 1] : null;
}

function getNextAvailableId(records) {
    const usedIds = new Set(
        Object.keys(records || {})
            .map(Number)
            .filter(id => !Number.isNaN(id) && id > 0)
    );

    let candidate = 1;
    while (usedIds.has(candidate)) {
        candidate += 1;
    }

    return candidate;
}

/**
 * @param {import('./data').RootData} data
 */
>>>>>>> bb0dfa2 (Added create and edit forms)
export function useAppData(data) {
    const [clients, setClients] = useState(data?.clients || {});
    const [properties, setProperties] = useState(data?.properties || {});
    const [payments, setPayments] = useState(data?.payments || {});
<<<<<<< HEAD
    
=======

>>>>>>> bb0dfa2 (Added create and edit forms)
    const [lastClientId, setLastClientId] = useState(data?.lastClientId || 0);
    const [lastPropertyId, setLastPropertyId] = useState(data?.lastPropertyId || 0);
    const [lastPaymentId, setLastPaymentId] = useState(data?.lastPaymentId || 0);

    useEffect(() => {
<<<<<<< HEAD
        saveToStorage({clients, properties, payments});
    }, [clients, properties, payments]);

    /**
     * @type {(arg0: import('./data').ClientData)}
     */
    const createClient = useCallback((clientData) => {
        setLastClientId(prev => {
            const newId = prev + 1;
            setClients(prevClients => ({
                ...prevClients,
                [newId]: {
                    ...clientData,
                    id: newId,
                    propertyIds: [],
                    fullName: clientData.fullName || "No name",
                    address: clientData.address || "No address"
                }
            }));
            return newId;
        });
    }, []);

    /**
     * @type {(arg0: import('./data').PropertyData)}
     */
    const createProperty = useCallback((propertyData) => {
        setLastPropertyId(prev => {
            const newId = prev + 1;
            setProperties(prevProperties => ({
                ...prevProperties,
                [newId]: {
                    ...propertyData,
                    id: newId,
                    account: {
                        termDuration: 24,
                        status: "active",
                        totalPrice: propertyData.total || 0,
                        termStart: new Date().setHours(0,0,0,0),
                        downPayment: 0,
                        monthlyPayment: 0,
                        ...propertyData.account,
                        paymentIds: []
                    }
                }
            }));
            return newId;
        });
    }, []);

    /**
     * @type {(arg0: number, arg1: import('./data').PaymentData)}
     */
    const createPaymentForProperty = useCallback((propertyId, { amount, paymentDate }) => {
        setLastPaymentId(prev => {
            const newId = prev + 1;
            
            // Add to payments object, then link it to property
            setPayments(prevPayments => ({
                ...prevPayments,
                [newId]: { id: newId, amount, paymentDate}
            }));

            setProperties(prevProperties => {
                const property = prevProperties[propertyId];
                if (!property) return prevProperties;

                return {
                    ...prevProperties,
                    [propertyId]: {
                        ...property,
                        account: {
                            ...property.account,
                            paymentIds: [...property.account.paymentIds, newId]
                        }
                    }
                };
            });
            return newId;
        });
    }, []);

    /**
     * @type {(arg0: number, arg1: number)}
     */
    const linkPropertyToClient = useCallback((clientId, propertyId) => {
        setClients(prevClients => {
            const client = prevClients[clientId];
            if (!client || !properties[propertyId]) return prevClients;

            return {
                ...prevClients,
                [clientId]: {
                    ...client,
                    propertyIds: [...client.propertyIds, propertyId]
                }
            };
        });
    }, [properties]); 

    /**
     * @type {(arg0: import('./data').ClientData)}
     */
    const editClient = useCallback(({id, fullName, address}) => {
=======
        saveToStorage({
            clients,
            properties,
            payments,
            lastClientId,
            lastPropertyId,
            lastPaymentId
        });
    }, [clients, properties, payments, lastClientId, lastPropertyId, lastPaymentId]);

    /**
     * @type {(arg0: import('./data').ClientData) => number}
     */
    const createClient = useCallback((clientData) => {
        const newId = getNextAvailableId(clients);

        setLastClientId(prev => Math.max(prev, newId));
        setClients(prevClients => ({
            ...prevClients,
            [newId]: {
                id: newId,
                propertyIds: [],
                fullName: clientData.fullName || 'No name',
                address: clientData.address || 'No address'
            }
        }));

        return newId;
    }, [clients]);

    /**
     * @type {(arg0: import('./data').PropertyData) => number}
     */
    const createProperty = useCallback((propertyData) => {
        const newId = getNextAvailableId(properties);
        const providedTotal = Number(propertyData.account?.totalPrice ?? propertyData.total);
        const calculatedTotal = Number(propertyData.areaInSqm || 0) * Number(propertyData.pricePerSqm || 0);
        const totalPrice = !Number.isNaN(providedTotal) && providedTotal > 0 ? providedTotal : calculatedTotal;

        setLastPropertyId(prev => Math.max(prev, newId));
        setProperties(prevProperties => ({
            ...prevProperties,
            [newId]: {
                ...propertyData,
                id: newId,
                account: {
                    ...propertyData.account,
                    status: 'available',
                    totalPrice,
                    termStart: propertyData.account?.termStart ?? new Date().setHours(0, 0, 0, 0),
                    termDuration: propertyData.account?.termDuration ?? 24,
                    downPayment: propertyData.account?.downPayment ?? 0,
                    monthlyPayment: propertyData.account?.monthlyPayment ?? 0,
                    activeClientId: null,
                    paymentIds: getUniqueIds(propertyData.account?.paymentIds)
                }
            }
        }));

        return newId;
    }, [properties]);

    /**
     * @type {(arg0: { propertyId: number, clientId: number, amount: number, paymentDate: number, paymentType: 'partial' | 'full' }) => {ok: boolean, error?: string, paymentId?: number, amount?: number}}
     */
    const createPaymentForProperty = useCallback(({ propertyId, clientId, amount, paymentDate, paymentType }) => {
        const numericPropertyId = Number(propertyId);
        const numericClientId = Number(clientId);
        const property = properties[numericPropertyId];

        if (!property) {
            return { ok: false, error: 'Property not found.' };
        }

        if (!clients[numericClientId]) {
            return { ok: false, error: 'Please select a valid client.' };
        }

        const existingPaymentIds = getUniqueIds(property.account?.paymentIds);
        const totalPrice = getPropertyTotalPrice(property);
        const totalPaid = getTotalPaid(existingPaymentIds, payments);
        const remainingBalance = Math.max(totalPrice - totalPaid, 0);

        if (remainingBalance <= 0 || property.account?.status === 'sold') {
            return { ok: false, error: 'This property is already fully paid.' };
        }

        const lockedClientId = property.account?.activeClientId;
        const hasLockedClient = lockedClientId !== null && lockedClientId !== undefined;
        const payableClientId = hasLockedClient ? Number(lockedClientId) : numericClientId;

        if (hasLockedClient && payableClientId !== numericClientId) {
            return { ok: false, error: 'This property already has an installment buyer. Use that client for succeeding payments.' };
        }

        const normalizedType = paymentType === 'full' ? 'full' : 'partial';
        let amountToPay = 0;

        if (normalizedType === 'full') {
            amountToPay = remainingBalance;
        } else {
            const numericAmount = Number(amount);

            if (Number.isNaN(numericAmount) || numericAmount <= 0) {
                return { ok: false, error: 'Amount must be greater than 0.' };
            }

            if (numericAmount > remainingBalance) {
                return { ok: false, error: 'Payment exceeds remaining balance.' };
            }

            amountToPay = numericAmount;
        }

        const paymentTimestamp = Number(paymentDate);
        if (Number.isNaN(paymentTimestamp)) {
            return { ok: false, error: 'Invalid payment date.' };
        }

        const newPaymentId = getNextAvailableId(payments);
        const nextTotalPaid = totalPaid + amountToPay;
        const isFullyPaid = nextTotalPaid >= totalPrice;
        const nextStatus = isFullyPaid ? 'sold' : 'in-payment';

        setLastPaymentId(prev => Math.max(prev, newPaymentId));
        setPayments(prevPayments => ({
            ...prevPayments,
            [newPaymentId]: {
                id: newPaymentId,
                amount: amountToPay,
                paymentDate: paymentTimestamp,
                clientId: payableClientId
            }
        }));

        setProperties(prevProperties => {
            const currentProperty = prevProperties[numericPropertyId];
            if (!currentProperty) return prevProperties;

            const dedupedIds = getUniqueIds(currentProperty.account?.paymentIds);
            const nextPaymentIds = dedupedIds.includes(newPaymentId) ? dedupedIds : [...dedupedIds, newPaymentId];

            return {
                ...prevProperties,
                [numericPropertyId]: {
                    ...currentProperty,
                    account: {
                        ...currentProperty.account,
                        status: nextStatus,
                        activeClientId: isFullyPaid ? null : payableClientId,
                        paymentIds: nextPaymentIds
                    }
                }
            };
        });

        setClients(prevClients => {
            const nextClients = {};

            for (const [id, client] of Object.entries(prevClients)) {
                const numericId = Number(id);
                const filteredPropertyIds = getUniqueIds(client.propertyIds).filter(pid => pid !== numericPropertyId);
                const shouldOwnProperty = numericId === payableClientId;

                nextClients[id] = {
                    ...client,
                    propertyIds: shouldOwnProperty ? [...filteredPropertyIds, numericPropertyId] : filteredPropertyIds
                };
            }

            return nextClients;
        });

        return {
            ok: true,
            paymentId: newPaymentId,
            amount: amountToPay
        };
    }, [clients, properties, payments]);

    /**
     * @type {(arg0: import('./data').ClientData) => void}
     */
    const editClient = useCallback(({ id, fullName, address }) => {
>>>>>>> bb0dfa2 (Added create and edit forms)
        setClients(prev => {
            const client = prev[id];
            if (!client) return prev;

            return {
                ...prev,
                [id]: {
                    ...client,
                    ...(fullName !== undefined && { fullName }),
                    ...(address !== undefined && { address })
                }
            };
        });
    }, []);

    /**
<<<<<<< HEAD
     * @type {(arg0: import('./data').PropertyData)}
=======
     * @type {(arg0: import('./data').PropertyData) => void}
>>>>>>> bb0dfa2 (Added create and edit forms)
     */
    const editProperty = useCallback((fields) => {
        setProperties(prev => {
            const property = prev[fields.id];
            if (!property) return prev;

            const { account, ...rest } = fields;
<<<<<<< HEAD
=======
            const nextAccount = account
                ? {
                    ...property.account,
                    ...account,
                    ...(account.paymentIds !== undefined && { paymentIds: getUniqueIds(account.paymentIds) })
                }
                : property.account;

>>>>>>> bb0dfa2 (Added create and edit forms)
            return {
                ...prev,
                [fields.id]: {
                    ...property,
                    ...rest,
<<<<<<< HEAD
                    account: account ? { ...property.account, ...account } : property.account
=======
                    account: nextAccount
>>>>>>> bb0dfa2 (Added create and edit forms)
                }
            };
        });
    }, []);

    /**
<<<<<<< HEAD
     * @type {(arg0: import('./data').PaymentData)}
     */
    const editPayment = useCallback(({id, amount, paymentDate}) => {
=======
     * @type {(arg0: import('./data').PaymentData) => void}
     */
    const editPayment = useCallback(({ id, amount, paymentDate }) => {
>>>>>>> bb0dfa2 (Added create and edit forms)
        setPayments(prev => {
            const payment = prev[id];
            if (!payment) return prev;

<<<<<<< HEAD
=======
            const normalizedPaymentDate = paymentDate instanceof Date
                ? paymentDate.getTime()
                : (paymentDate !== undefined ? Number(paymentDate) : undefined);

>>>>>>> bb0dfa2 (Added create and edit forms)
            return {
                ...prev,
                [id]: {
                    ...payment,
                    ...(amount !== undefined && { amount }),
<<<<<<< HEAD
                    ...(paymentDate !== undefined && { paymentDate: paymentDate.getTime() })
=======
                    ...(
                        normalizedPaymentDate !== undefined &&
                        !Number.isNaN(normalizedPaymentDate) &&
                        { paymentDate: normalizedPaymentDate }
                    )
>>>>>>> bb0dfa2 (Added create and edit forms)
                }
            };
        });
    }, []);

    /**
<<<<<<< HEAD
     * @type {(arg0: number, arg1: number)}
     */
    const deletePayment = useCallback((paymentId) => {

        // Remove from payments, then unlink from its property
        setPayments(prev => {
            const { [paymentId]: removed, ...rest } = prev;
            return rest;
        });

        setProperties(prev => {
            const propertyId = Object.values(properties).find(p => p.account.paymentIds.includes(paymentId)).id;
=======
     * @type {(arg0: number) => void}
     */
    const deletePayment = useCallback((paymentId) => {
        const numericPaymentId = Number(paymentId);
        const linkedProperty = Object.values(properties).find(property =>
            getUniqueIds(property.account?.paymentIds).includes(numericPaymentId)
        );

        const nextPayments = { ...payments };
        delete nextPayments[numericPaymentId];

        setPayments(nextPayments);

        if (!linkedProperty) {
            return;
        }

        const propertyId = linkedProperty.id;
        const nextPaymentIds = getUniqueIds(linkedProperty.account?.paymentIds).filter(id => id !== numericPaymentId);
        const totalPrice = getPropertyTotalPrice(linkedProperty);
        const paidTotal = getTotalPaid(nextPaymentIds, nextPayments);

        let nextStatus = 'available';
        if (nextPaymentIds.length > 0) {
            nextStatus = paidTotal >= totalPrice ? 'sold' : 'in-payment';
        }

        const nextActiveClientId = nextStatus === 'in-payment'
            ? getLastPaymentClientId(nextPaymentIds, nextPayments)
            : null;
        const ownerClientId = nextStatus === 'available'
            ? null
            : getLastPaymentClientId(nextPaymentIds, nextPayments);

        setProperties(prev => {
>>>>>>> bb0dfa2 (Added create and edit forms)
            const property = prev[propertyId];
            if (!property) return prev;

            return {
                ...prev,
                [propertyId]: {
                    ...property,
                    account: {
                        ...property.account,
<<<<<<< HEAD
                        paymentIds: property.account.paymentIds.filter(id => id !== paymentId)
=======
                        status: nextStatus,
                        activeClientId: nextActiveClientId,
                        paymentIds: nextPaymentIds
>>>>>>> bb0dfa2 (Added create and edit forms)
                    }
                }
            };
        });
<<<<<<< HEAD
    }, []);

    /**
     * @type {(arg0: number)}
     */
    const deleteProperty = useCallback((propertyId) => {
        // We need the current state to know what payments to delete
        // In a real app, it's often safer to use a reducer for cascading deletes,
        // but we can do it here by accessing the current state variables.
        
        const property = properties[propertyId];
        if (!property) return;

        setPayments(prev => {
            const newPayments = { ...prev };
            property.account.paymentIds.forEach(id => delete newPayments[id]);
            return newPayments;
        });

        setClients(prev => {
            const newClients = {};
            for (const [id, client] of Object.entries(prev)) {
                newClients[id] = {
                    ...client,
                    propertyIds: client.propertyIds.filter(pid => pid !== propertyId)
                };
            }
            return newClients;
        });

        setProperties(prev => {
            const { [propertyId]: removed, ...rest } = prev;
=======

        setClients(prev => {
            const nextClients = {};

            for (const [id, client] of Object.entries(prev)) {
                const numericId = Number(id);
                const filteredPropertyIds = getUniqueIds(client.propertyIds).filter(pid => pid !== propertyId);
                const shouldOwnProperty = ownerClientId !== null && numericId === ownerClientId;

                nextClients[id] = {
                    ...client,
                    propertyIds: shouldOwnProperty ? [...filteredPropertyIds, propertyId] : filteredPropertyIds
                };
            }

            return nextClients;
        });
    }, [properties, payments]);

    /**
     * @type {(arg0: number) => void}
     */
    const deleteProperty = useCallback((propertyId) => {
        const numericPropertyId = Number(propertyId);
        const property = properties[numericPropertyId];
        if (!property) return;

        const paymentIdsToDelete = getUniqueIds(property.account?.paymentIds);

        setPayments(prev => {
            const nextPayments = { ...prev };
            for (const id of paymentIdsToDelete) {
                delete nextPayments[id];
            }
            return nextPayments;
        });

        setClients(prev => {
            const nextClients = {};
            for (const [id, client] of Object.entries(prev)) {
                nextClients[id] = {
                    ...client,
                    propertyIds: getUniqueIds(client.propertyIds).filter(pid => pid !== numericPropertyId)
                };
            }
            return nextClients;
        });

        setProperties(prev => {
            const { [numericPropertyId]: _removed, ...rest } = prev;
>>>>>>> bb0dfa2 (Added create and edit forms)
            return rest;
        });
    }, [properties]);

    /**
<<<<<<< HEAD
     * @type {(arg0: number)}
     */
    const deleteClient = useCallback((clientId) => {
        const client = clients[clientId];
        if (!client) return;

        // 1. Trigger property deletions (which trigger payment deletions)
        // client.propertyIds.forEach(propertyId => deleteProperty(propertyId));

        // 2. Delete the client
        setClients(prev => {
            const { [clientId]: removed, ...rest } = prev;
            return rest;
        });
    }, [clients, deleteProperty]);

    return {
        // State
        clients, properties, payments,
        // Methods
        createClient, createProperty, createPaymentForProperty, linkPropertyToClient,
        editClient, editProperty, editPayment,
        deleteClient, deleteProperty, deletePayment,
=======
     * @type {(arg0: number) => void}
     */
    const deleteClient = useCallback((clientId) => {
        const numericClientId = Number(clientId);
        const client = clients[numericClientId];
        if (!client) return;

        const ownedPropertyIds = getUniqueIds(client.propertyIds);
        const activePropertyIds = Object.values(properties)
            .filter(property => Number(property.account?.activeClientId) === numericClientId)
            .map(property => property.id);
        const propertyIdsToReset = getUniqueIds([...ownedPropertyIds, ...activePropertyIds]);
        const propertyIdsToResetSet = new Set(propertyIdsToReset);
        const paymentIdsToDelete = getUniqueIds(
            propertyIdsToReset.flatMap(propertyId => properties[propertyId]?.account?.paymentIds || [])
        );

        setPayments(prev => {
            if (paymentIdsToDelete.length === 0) {
                return prev;
            }

            const nextPayments = { ...prev };
            for (const paymentId of paymentIdsToDelete) {
                delete nextPayments[paymentId];
            }

            return nextPayments;
        });

        setProperties(prev => {
            if (propertyIdsToReset.length === 0) {
                return prev;
            }

            const nextProperties = { ...prev };

            for (const propertyId of propertyIdsToReset) {
                const property = nextProperties[propertyId];
                if (!property) {
                    continue;
                }

                nextProperties[property.id] = {
                    ...property,
                    account: {
                        ...property.account,
                        status: 'available',
                        activeClientId: null,
                        paymentIds: []
                    }
                };
            }

            return nextProperties;
        });

        setClients(prev => {
            const nextClients = {};

            for (const [id, existingClient] of Object.entries(prev)) {
                if (Number(id) === numericClientId) {
                    continue;
                }

                nextClients[id] = {
                    ...existingClient,
                    propertyIds: getUniqueIds(existingClient.propertyIds).filter(pid => !propertyIdsToResetSet.has(pid))
                };
            }

            return nextClients;
        });
    }, [clients, properties]);

    return {
        clients,
        properties,
        payments,
        createClient,
        createProperty,
        createPaymentForProperty,
        editClient,
        editProperty,
        editPayment,
        deleteClient,
        deleteProperty,
        deletePayment
>>>>>>> bb0dfa2 (Added create and edit forms)
    };
}