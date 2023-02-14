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
        const offering = await connector.getFederatedOffering(user.access_token, user.id_token, agreement.dataOffering.dataOfferingId);
        return { ...agreement, offering };
    }
    return null;
});
