import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        switch (req.method) {
            case 'GET':
                // if consumer only retrieve offering information
                if (user.consumer) {
                    const offering = await connector.getFederatedOffering(user.access_token, user.id_token, offeringId);
                    return {
                        ...offering,
                        user,
                        providerRating:{providerRating: 3.75, roundedRating: 4.5}
                    };
                }

                // if provider retrieve offering, contracts and pending contracts

                // offering
                const federateOffering = await connector.getFederatedOffering(user.access_token, user.id_token, offeringId);
                // created contracts
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
                return {
                    ...federateOffering,
                    contracts,
                    pendingContracts,
                    user,
                    providerRating:{providerRating: 3.75, roundedRating: 4.5}
                };
            case 'PATCH':
                const offering = await connector.getOffering(user.access_token, user.id_token, offeringId);
                offering.status = 'Active';
                offering.active = true;
                delete offering.createdAt;
                return await connector.updateOffering(user.access_token, user.id_token, offering);
            default:
                return null;
        }
    }
    return null;
});

