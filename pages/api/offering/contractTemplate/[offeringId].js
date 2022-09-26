import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../../lib/session';
import * as nonRepudiationLibrary from '@i3m/non-repudiation-library';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        switch (req.method) {
            case 'GET':
                const template = await connector.getContractTemplate(user.access_token, user.id_token, offeringId);
                const signingAlg = template.dataExchangeAgreement.signingAlg;

                const providerJwks = await nonRepudiationLibrary.generateKeys(signingAlg);
                const publicKey = providerJwks.publicJwk;

                const contractTemplate = {
                    ...template,
                    dataExchangeAgreement: {
                        ...template.dataExchangeAgreement,
                        dest: `${JSON.stringify(publicKey)}`
                    }
                }
                const offering = await connector.getOffering(user.access_token, user.id_token, offeringId);
                return { ...contractTemplate, offering, user };
        }
    }
    return null;
});
