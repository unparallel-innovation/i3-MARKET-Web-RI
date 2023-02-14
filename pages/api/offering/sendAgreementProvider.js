import { catchErrors, connector } from '../../../lib/server';
import { getSession } from '../../../lib/session';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        const dataSharingAgreement = req.body;
        const message = {
            msg: `Agreement for offering "${dataSharingAgreement.dataOfferingDescription.title}" signed. Please confirm to create the agreement`,
            dataSharingAgreement: dataSharingAgreement
        };
        await connector.createNotification(user.access_token, user.id_token, 'web-ri', dataSharingAgreement.parties.providerDid, 'agreement.accepted', message, 'OK');
    }
    return null;
});
