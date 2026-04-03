// Manages saving, loading, creation of localStorage

// A 'rough' object representing the data needed for our billing system
// Not final
const dataTemplate = {
    [clientId]: {
        // Basic info of the client
        fullName,
        address,

        // A client can have 1 or more properties
        propertyLots: {
            [propertyId]: {
                location,
                pricePerSqm,

                // Each property has a ledger account. Containing overall balance, installment information, payment history, etc
                account: {
                    status,
                    totalPrice,
                    remaining,
                    installment: {
                        termStart,
                        termDuration,
                        downPayment,
                        monthlyPayment
                    },
                    
                    payments: {
                        [paymentId]: {
                            amount,
                            paymentDate
                        }
                    }
                }
            }
        }
    }
}

// Return save data if it exists. If not, make a fresh new save data.
export function loadData() {
    const jsonData = localStorage.getItem("data");

    if (jsonData) {
        const data = JSON.parse(jsonData);
        return data;
    } else {

    }
}