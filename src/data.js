// Manages saving, loading, creation of data for localStorage

// A 'rough' object representing the data needed for our billing system
// Not final
const sample = {
    1: {
        // Basic info of the client
        fullName: "John Doe",
        address: "Davao City",

        // A client can have 1 or more properties
        propertyLots: {
            1000: {
                location: "Davao City",
                pricePerSqm: 200,

                // Each property has a ledger account. Containing overall balance, installment information, payment history, etc
                account: {
                    status: "active",
                    totalPrice: 140000,
                    remaining: 110000,
                    installment: {
                        termStart: new Date().setHours(0,0,0,0),
                        termDuration: 24,
                        downPayment: 20000,
                        monthlyPayment: 5000
                    },
                    
                    payments: {
                        44: {
                            amount: 6000,
                            paymentDate: new Date().setHours(6,0,0,0),
                        },
                        72: {
                            amount: 4000,
                            paymentDate: new Date().setHours(10,21,0,0)
                        }
                    }
                }
            }
        }
    },

    2: {
        // Basic info of the client
        fullName: "Juan dela Cruz",
        address: "Davao City",

        // A client can have 1 or more properties
        propertyLots: {
            1001: {
                location: "Davao City",
                pricePerSqm: 300,

                // Each property has a ledger account. Containing overall balance, installment information, payment history, etc
                account: {
                    status: "active",
                    totalPrice: 250000,
                    remaining: 170000,
                    installment: {
                        termStart: new Date().setHours(0,0,0,0),
                        termDuration: 12,
                        downPayment: 10000,
                        monthlyPayment: 20000
                    },
                    
                    payments: {
                        12: {
                            amount: 30000,
                            paymentDate: new Date().setHours(5,30,0,0),
                        },
                        98: {
                            amount: 20000,
                            paymentDate: new Date().setHours(7,44,0,0)
                        },
                        122: {
                            amount: 10000,
                            paymentDate: new Date().setHours(16,11,0,0)
                        },
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
        const data = {...sample};
        saveToStorage(data);
        return data;
    }
}

// Save to localStorage
export function saveToStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
}