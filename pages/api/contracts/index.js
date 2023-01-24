import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';
import agreements from '../../../lib/agreements.json';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { offeringId, consumerPublicKeys, searchType } = req.query;
        if (searchType === 'consumer') {
            return { contracts: agreements, user };
            // const parsedPublicKeys = JSON.parse(consumerPublicKeys);

            // let contracts = [];
            // for (let i = 0; i < parsedPublicKeys.length; i++) {
            //     const publicKey = parsedPublicKeys[i];
            //     const contracts = await connector.getAgreementsByConsumer(user.access_token, user.id_token, publicKey, false);
            //     console.log(i, contracts);
            // }

            // const contracts = await connector.getAgreementsByConsumer(user.access_token, user.id_token, parsedPublicKeys, false);
            // console.log(contracts)
            // return { contracts, user };
        }
        else {
            const contracts = await connector.getAgreementsByOffering(user.access_token, user.id_token, offeringId);
            return { contracts, user };
        }
    }
    return null;
});
