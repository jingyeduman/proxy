const ProxyChain = require('proxy-chain');
const crypto = require('crypto');

function md5(content) {
    return crypto.createHash('md5').update((content || '').toString()).digest("hex");
}

const server = new ProxyChain.Server({
    port: 9211,
    prepareRequestFunction: ({ username, password }) => {
        let passwordMd5 = md5(md5(password));
        if (username !== 'ping' || passwordMd5 !== 'cda11a2bac6b5477de87968f63c1ea98') {
            return {
                customResponseFunction: () => {
                    return {
                        statusCode: 403,
                        body: `auth fail`,
                    };
                },
            };
        }

        return {};
    }
});

server.listen(() => {
    console.log(`Proxy server is listening on port ${9211}`);
});