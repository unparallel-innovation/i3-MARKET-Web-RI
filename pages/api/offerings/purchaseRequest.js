import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';
import * as nonRepudiationLibrary from '@i3m/non-repudiation-library';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const template = req.body;

        // generate consumer public key
        const signingAlg = template.dataExchangeAgreement.signingAlg;
        const consumerJwks = await nonRepudiationLibrary.generateKeys(signingAlg);
        const consumerPublicKey = consumerJwks.publicJwk;

        const contractTemplate = {
            ...template,
            dataExchangeAgreement: {
                ...template.dataExchangeAgreement,
                dest: `${JSON.stringify(consumerPublicKey)}`
            }
        };
        return await connector.createDataPurchase(user.access_token, user.id_token, 'web-ri', user.DID, '', contractTemplate);
    }
    return null;
});
