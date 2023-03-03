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

        let isRated = await connector.getAgreementIsRated(agreement.agreementId, user.access_token, user.id_token);
        isRated = isRated.data;
        let rating;
        if (isRated) {
            rating = (await connector.getAgreementRating(agreement.agreementId, user.access_token, user.id_token)).data.rating;
        } else {
            rating = {
                'subRatings' : [0, 0, 0, 0],
                'onTransaction' : agreementId,
            };
        };
        const questions = [
            'Was the dataset provided as described in the listing?',
            'Was the data transfer within the expected timeframe?',
            'Was the data provider open and clear in their communication?',
            'Were they any other issues or concerns in the transaction?'
        ];
        agreement.isRated = isRated;
        agreement.rating = rating;
        agreement.rating.questions = questions;
        const offering = await connector.getFederatedOffering(user.access_token, user.id_token, agreement.dataOffering.dataOfferingId);
        return { ...agreement, offering };
    }
    return null;
});
