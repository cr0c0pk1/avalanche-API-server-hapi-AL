const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');

const X_CHAIN = "X";
const P_CHAIN = "P";
const C_CHAIN = "0x";

module.exports = [
    {
        method: 'GET',
        path: '/transactions/hash/{hash}',
        handler: async (request, h) => {
            let xChainTransaction;
            let cChainTransaction;
            let pChainTransaction;
            let returnData;

            xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(
                request.params.hash
            );
            cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(
                request.params.hash
            );
            pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(
                request.params.hash
            );

            if (
                xChainTransaction == 1 &&
                cChainTransaction[0] == 1 &&
                pChainTransaction == 1
            ) {
                return {
                    result: "connection refused to avalanche client or api call rejected",
                };
            } else if (xChainTransaction != 1) {
                returnData = xChainTransaction;

                return { returnData };
            } else if (cChainTransaction[0] != 1) {
                returnData = cChainTransaction[1];

                return { returnData };
            } else if (pChainTransaction != 1) {
                returnData = pChainTransaction;

                return { returnData };
            }
        }
    },
    {
        method: 'GET',
        path: '/transactions/{address}/{n}/{x}',
        handler: async (request, h) => {
            let xChainTransactions;
            let pChainTransactions;
            let cChainTransactions;
            let returnData;

            if (request.params.address.charAt(0) == X_CHAIN) {
                xChainTransactions =
                    await xChainMethods.getXTransactionsAfterNthFromAddressFromXChain(
                        request.params.address,
                        request.params.n,
                        request.params.x
                    );

                if (xChainTransactions[0] == 1) {
                    returnData = xChainTransactions[1];

                    return { returnData };
                } else {
                    returnData = xChainTransactions[1];

                    return { returnData };
                }
            } else if (request.params.address.charAt(0) == P_CHAIN) {
                pChainTransactions =
                    await pChainMethods.getXTransactionsAfterNthFromAddressFromPChain(
                        request.params.address,
                        request.params.n,
                        request.params.x
                    );

                if (pChainTransactions == 1) {
                    return { result: "api call rejected or not enough transactions" };
                } else {
                    returnData = pChainTransactions;

                    return { returnData };
                }
            } else if (request.params.address.slice(0, 2) == C_CHAIN) {
                cChainTransactions =
                    await cChainMethods.getXTransactionsAfterNthFromAddressFromCChain(
                        request.params.address,
                        request.params.n,
                        request.params.x
                    );

                if (cChainTransactions == 1) {
                    return { result: "api call rejected or not enough transactions" };
                } else {
                    returnData = cChainTransactions;

                    return { returnData };
                }
            } else {
                return { result: "wrong chain" };
            }
        }
    },
    {
        method: 'GET',
        path: '/transactions/{n}/{x}',
        handler: async (request, h) => {
            let cChainTransactions;
            let returnData;

            if (request.params.n > 0 && request.params.x > 0) {
                cChainTransactions =
                    await cChainMethods.getXPendingTransactionsAfterNthFromCChain(
                        request.params.n,
                        request.params.x
                    );

                if (cChainTransactions[0] == 1) {
                    returnData = cChainTransactions[1];

                    return { returnData };
                } else {
                    returnData = cChainTransactions[1];

                    return { returnData };
                }
            } else {
                return { result: "n and x < 0" };
            }
        }
    },
    {
        method: 'GET',
        path: '/transactions/recentxchain',
        handler: async (request, h) => {
            let xChainTransactions;
            let returnData;

            xChainTransactions = await xChainMethods.getRecentTransactions();

            returnData = xChainTransactions[1];

            return { returnData };
        }
    },
    {
        method: 'GET',
        path: '/transactions/recentpchain',
        handler: async (request, h) => {
            let pChainTransactions;
            let returnData;

            pChainTransactions = await pChainMethods.getRecentTransactions();

            returnData = pChainTransactions[1];

            return { returnData };
        }
    }
]