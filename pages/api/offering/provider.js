import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;
    if (user) {
        const offerings = await connector.getProviderOfferings(user.access_token, user.id_token, user.username);

        let result = [];
        // fetch contracts
        for (let i = 0; i < offerings.length; i++) {
            const offering = offerings[i];

            // retrieve the list of created contracts
            const contracts = await connector.getAgreementsByOffering(user.access_token, user.id_token, offering.dataOfferingId);

            let pendingContracts = [];
            // to retrieve pending contracts, must fetch notifications
            const allNotifications = await connector.getAllNotifications(user.access_token, user.id_token);

            if (allNotifications) {

                // filter notifications with dataSharingAgreement
                const agreementNotifications = allNotifications.filter(el=>el.data.dataSharingAgreement);

                for (let j = 0; j < agreementNotifications.length; j++) {
                    const agreementNotification = agreementNotifications[j];

                    // pending contracts will be the ones with "agreement.pending", message with "Agreement pending" for the corresponding offeringId
                    if (agreementNotification.data.dataSharingAgreement.dataOfferingDescription.dataOfferingId === offering.dataOfferingId
                                && agreementNotification.action === 'agreement.pending' && agreementNotification.data.msg.includes('Agreement pending')) {
                        pendingContracts.push(agreementNotification);
                    }
                }
            }
            result.push({ ...offering, contracts: contracts, pendingContracts: pendingContracts });
        }
        return result;
    }
    return null;
});
