import { catchErrors, connector } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const { agreementId } = req.query;
        const agreement = await connector.getAgreement(user.access_token, user.id_token, agreementId);
        const agreementState = await connector.getAgreementState(user.access_token, user.id_token, agreement.agreementId);
        agreement.stateValue = agreementState.state;
        const isRated = true;
        const rating = (isRated) ? {
            '_id': '6385e559ba41747fe0e9ed7e',
            'byConsumer': 'did:ethr:i3m:0x078187493520',
            'forProvider': 'did:ethr:i3m:0x040926266145',
            'onTransaction': '63637-abcee738737-64742ade',
            'subRatings': [5, 4, 4, 3],
            'comment': 'I was very happy with the transaction',
            'response': 'Thank you for your purchase',
            'createdAt': '2022-11-29T10:56:25.961Z',
            'updatedAt': '2022-11-29T10:56:25.961Z'
        } : {
            'subRatings' : [0, 0, 0, 0],
            'onTransaction' : agreementId,
        };
        const questions = [
            'Was the dataset provided as described in the listing?',
            'Was the data transfer within the expected timeframe?',
            'Was the data provider open and clear in their communication?',
            'Were they any other issues or concerns in the transaction?'
        ];
        console.log(agreement);
        agreement.isRated = isRated;
        agreement.rating = rating;
        agreement.rating.questions = questions;
        const offering = await connector.getFederatedOffering(user.access_token, user.id_token, agreement.dataOffering.dataOfferingId);
        return { ...agreement, offering };
    }
    return null;
});
