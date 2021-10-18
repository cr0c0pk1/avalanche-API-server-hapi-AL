const networkService = require('../services/network');

module.exports = {
    method: 'GET',
    path: '/network',
    handler: async (request, h) => {
        const returnData = await networkService.getNetWorkActivity();
        return { returnData };
    }
}