import { catchErrors, connector } from '/lib/server.js';
import { getSession } from '../../../../lib/session';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        switch (req.method) {
            case 'GET':
                if (req.query.price) {
                    const fee = await connector.getFee(user.access_token, user.id_token, req.query.price);

                    const paymentType = {
                        type: req.query?.type,
                        name: req.query?.name,
                        price: req.query?.price,
                        currency: req.query?.currency,
                        fee: fee.toString()
                    }
                    const template = await connector.getContractTemplate(user.access_token, user.id_token, offeringId); // TODO add paymentType object
                    const offering = await connector.getOffering(user.access_token, user.id_token, offeringId);
                    return { ...template, offering, user };
                }
                return null;
        }
    }
    return null;
});
