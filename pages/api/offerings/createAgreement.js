import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';
import * as nonRepudiationLibrary from '@i3m/non-repudiation-library';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { senderAddress, template } = req.body;

        // generate provider public key
        const signingAlg = template.dataExchangeAgreement.signingAlg;
        const providerJwks = await nonRepudiationLibrary.generateKeys(signingAlg);
        const providerPublicKey = providerJwks.publicJwk;

        const contractTemplate = {
            ...template,
            dataExchangeAgreement: {
                ...template.dataExchangeAgreement,
                orig: `${JSON.stringify(providerPublicKey)}`
            }
        };
        return await connector.createAgreementRawTransaction(user.access_token, user.id_token, senderAddress, contractTemplate);
    }
    return null;
});
