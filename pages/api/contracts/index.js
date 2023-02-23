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

            // retrieve offering and state value
            let contracts = [];
            for (let i = 0; i < agreements.length; i++) {
                const agreement = agreements[i];
                const agreementState = await connector.getAgreementState(user.access_token, user.id_token, agreement.agreementId);
                agreement.stateValue = agreementState.state;
                const isRated = true;
                const rating = {
                    '_id': '6385e559ba41747fe0e9ed7e',
                    'byConsumer': 'did:ethr:i3m:0x078187493520',
                    'forProvider': 'did:ethr:i3m:0x040926266145',
                    'onTransaction': '63637-abcee738737-64742ade',
                    'subRatings': [5, 4, 4, 4],
                    'comment': 'I was very happy with the transaction',
                    'response': 'Thank you for your purchase',
                    'createdAt': '2022-11-29T10:56:25.961Z',
                    'updatedAt': '2022-11-29T10:56:25.961Z'
                };
                agreement.rating = rating;
                agreement.isRated = isRated;
                const offering = await connector.getFederatedOffering(user.access_token, user.id_token, agreement.dataOffering.dataOfferingId);
                agreement.provider = offering.provider;
                contracts.push(agreement);
            }
            // console.log(contracts)
            return { contracts: contracts, user };
        }
        else {
            // contracts
            const agreements = await connector.getAgreementsByOffering(user.access_token, user.id_token, offeringId);

            // retrieve state value
            let contracts = [];
            for (let i = 0; i < agreements.length; i++) {
                const agreement = agreements[i];
                const agreementState = await connector.getAgreementState(user.access_token, user.id_token, agreement.agreementId);
                agreement.stateValue = agreementState.state;
                const isRated = false;
                const rating = {
                    //'_id': '6385e559ba41747fe0e9ed7e',
                    'byConsumer': 'did:ethr:i3m:0x078187493520',
                    'forProvider': 'did:ethr:i3m:0x040926266145',
                    'onTransaction': '63637-abcee738737-64742ade',
                    'subRatings': [5, 4, 4, 4],
                    'comment': 'I was very happy with the transaction',
                    'response': 'Thank you for your purchase',
                    'createdAt': '2022-11-29T10:56:25.961Z',
                    'updatedAt': '2022-11-29T10:56:25.961Z'
                };
                agreement.rating = rating;
                agreement.rating.isRated = isRated;
                contracts.push(agreement);
            }

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
