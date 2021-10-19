const cChainMethods = require('../services/c-chain');

module.exports = [
    {
        method: 'GET',
        path: '/blocks/hash/{hash}',
        handler: async (request, h) => {
            const blockFromCChain = await cChainMethods.getBlockByHashFromCChain(
                request.params.hash
            );
        
            const returnData = blockFromCChain[1];
        
            return { returnData };
        }
    },
    {
        method: 'GET',
        path: '/blocks/number/{blocknumber}',
        handler: async (request, h) => {
            const cChainNumber = await cChainMethods.getBlockByNumberFromCChain(
                request.params.blocknumber
            );
        
            let returnData;
        
            if (cChainNumber[0] == 1) {
            returnData = cChainNumber[1];
        
            return { returnData };
            } else {
            returnData = cChainNumber[0];
        
            return { returnData };
            }
        }
    },
    {
        method: 'GET',
        path: '/blocks/numbers/{blocknumber}/{count}',
        handler: async (request, h) => {
            const cChainArray = [];
            let returnData;
            let k = 0;

            const blockNumber = request.params.blocknumber;
            const count = request.params.count;

            for (let i = blockNumber - count; i < blockNumber; ++i) {
                let hashValue = await cChainMethods.getBlockByNumberFromCChain(
                i.toString()
            );

            if (hashValue[0] == 1) {
                returnData = hashValue[1];
                return { returnData };
                } else {
                    cChainArray[k] = hashValue[1];
                    k++;
                }
            }

            return { cChainArray };
        }
    }
];