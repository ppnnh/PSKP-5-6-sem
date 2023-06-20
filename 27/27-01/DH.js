const crypto = require('crypto');
//
class ServerDH {
    constructor(len_a, g) {//1024, 3
        const dh = crypto.createDiffieHellman(len_a, g);
        const p = dh.getPrime(); //возвращает простое значение DiffieHellman в указанной кодировке
        const gb = dh.getGenerator(); //используется для получения значения генератора объекта DiffieHellman (dh). 
        const k = dh.generateKeys(); // используется для генерации значения закрытого и открытого ключа объекта DiffieHellman (dh)
        this.getContext = () => {
            return {
                p_hex: p.toString('hex'), // в 16-ричном виде
                g_hex: gb.toString('hex'),
                key_hex: k.toString('hex')
            };
        };
        this.getSecret = (clientContext) => {
            const k = Buffer.from(clientContext.key_hex, 'hex');
            return dh.computeSecret(k);//используется для создания общего секрета с использованием открытого ключа другой стороны. 
            //Кодировку как входного открытого ключа, так и выходного секретного ключа можно указать с помощью соответствующих параметров.
        };
    }
}

class ClientDH {
    constructor(serverContext) {
        const ctx = {
            p_hex: serverContext.p_hex ? serverContext.p_hex : '1111',
            g_hex: serverContext.g_hex ? serverContext.g_hex : '1',
        };
        const p = Buffer.from(ctx.p_hex, 'hex');
        const g = Buffer.from(ctx.g_hex, 'hex');
        const dh = crypto.createDiffieHellman(p, g);
        const k = dh.generateKeys();
        this.getContext = () => {
            return {
                p_hex: p.toString('hex'),
                g_hex: g.toString('hex'),
                key_hex: k.toString('hex')
            };
        };
        this.getSecret = (serverContext) => {
            const k = Buffer.from(serverContext.key_hex, 'hex');
            return dh.computeSecret(k);
        };
    }
}
module.exports.ServerDH = ServerDH;
module.exports.ClientDH = ClientDH;