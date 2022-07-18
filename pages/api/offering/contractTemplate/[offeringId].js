import { catchErrors, connector, UserResponse } from '/lib/server.js';
import { getSession } from '../../../../lib/session';

export default catchErrors(async (req, res) => {

    const { offeringId, type, name, price, currency } = req.query;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        switch (req.method) {
            case 'GET':
                const fee = await connector.getFee(user.access_token, user.id_token, price);
                const paymentType = {
                    type, name, price, fee: fee.toString(), currency
                }
                const template = await connector.getContractTemplate(user.access_token, user.id_token, offeringId); // TODO add paymentType object
                const offering = await connector.getOffering(user.access_token, user.id_token, offeringId);
                return { ...template, offering, user };
        }
    }
    return null;
});
