const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');

const X_CHAIN = "X";
const P_CHAIN = "P";
const C_CHAIN = "0x";

module.exports = [
    {
        method: 'GET',
        path: '/address/hash/{hash}',
        handler: async (request, h) => {
            let addressInfoFromXChain;
            let addressInfoFromCChain;
            let addressInfoFromPChain;
            let returnData;

            if (request.params.hash.charAt(0) == X_CHAIN) {
                addressInfoFromXChain =
                    await xChainMethods.getAddressInfoByHashFromXChain(request.params.hash);

                if (addressInfoFromXChain[0] == 1) {
                    returnData = addressInfoFromXChain[1];

                    return { returnData };
                } else {
                    returnData = addressInfoFromXChain;

                    return { returnData };
                }
            } else if (request.params.hash.charAt(0) == P_CHAIN) {
                addressInfoFromPChain = await pChainMethods.getAddressInfoFromPChain(
                    request.params.hash
                );

                if (addressInfoFromPChain[0] == 1) {
                    returnData = addressInfoFromPChain[1];

                    return { returnData };
                } else {
                    returnData = addressInfoFromPChain[1];

                    return { returnData };
                }
            } else if (request.params.hash.slice(0, 2) == C_CHAIN) {
                addressInfoFromCChain = await cChainMethods.getAddressInfoFromCChain(
                    request.params.hash
                );

                if (addressInfoFromCChain[0] == 1) {
                    returnData = addressInfoFromCChain[1];

                    return { returnData };
                } else {
                    returnData = addressInfoFromCChain;

                    return { returnData };
                }
            } else {
                return { result: "wrong input" };
            }
        }
    }
];