import { catchErrors, connector } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    switch (req.method) {
        case 'POST':
            const { action, status, data } = req.body;
            const message = {
                msg: `Agreement pending for offering ${data.contractualParameters.dataOfferingDescription.dataOfferingId}`,
                template: data.contractualParameters
            };
            const type = `${action.toLowerCase()}.${status.toLowerCase()}`;

            return await connector.createNotification('accessToken', 'idToken', 'i3m', data.providerDID, type, message, 'OK');
    }
});
