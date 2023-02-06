import { getSession } from '../../../lib/session';
import { catchErrors, connector } from '../../../lib/server';
import agreements from '../../../lib/agreements.json';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { offeringId, consumerPublicKeys, searchType } = req.query;
        if (searchType === 'consumer') {
            // retrieve agreements based on consumer public keys
            const data = {
                'public_keys': JSON.parse(consumerPublicKeys),
                'active': false
            };
            const agreements = await connector.getAgreementsByConsumer(user.access_token, user.id_token, data);

            // retrieve the information about the offering associated to each agreement
            let contracts = [];
            for (let i = 0; i < agreements.length; i++) {
                const agreement = agreements[i];
                agreement.offering = await connector.getFederatedOffering(user.access_token, user.id_token, agreement.dataOffering.dataOfferingId);
                contracts.push(agreement);
            }
            return { contracts, user };
        }
        else {
            // contracts
            const contracts = await connector.getAgreementsByOffering(user.access_token, user.id_token, offeringId);

            // pending contracts
            let pendingContracts = [];
            const allNotifications = await connector.getAllNotifications(user.access_token, user.id_token);
            if (allNotifications) {
                // filter notifications with dataSharingAgreement
                const agreementNotifications = allNotifications.filter(el=>el.data.dataSharingAgreement);

                for (let j = 0; j < agreementNotifications.length; j++) {
                    const agreementNotification = agreementNotifications[j];

                    // pending contracts will be the ones with "agreement.pending", message with "Agreement pending" for the corresponding offeringId
                    if (agreementNotification.data.dataSharingAgreement.dataOfferingDescription.dataOfferingId === offeringId
                        && agreementNotification.action === 'agreement.pending' && agreementNotification.data.msg.includes('Agreement pending')) {
                        pendingContracts.push(agreementNotification);
                    }
                }
            }
            return { contracts: [...contracts, ...pendingContracts], user };
        }
    }
    return null;
});
