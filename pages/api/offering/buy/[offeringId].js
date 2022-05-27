import { catchErrors, connector, UserResponse } from '/lib/server.js';
import { getSession } from '../../../../lib/session';

export default catchErrors(async (req, res) => {
    const { offeringId } = req.query;
    const session = await getSession(req, res);
    const user = session.user;

    if (user) {
        switch (req.method) {
            case 'GET':

                console.log('user response', UserResponse.Yes)


                return await connector.getContractTemplate(user.access_token, user.id_token, '12134');
                // return {
                //     "DataOfferingDescription": {
                //         "dataOfferingId": "62839184d348c942dab514e9",
                //         "provider": "provider_webri",
                //         "description": "string",
                //         "title": "string",
                //         "category": "justice",
                //         "isActive": true
                //     },
                //     "Purpose": "",
                //     "hasParties": {
                //         "Parties": {
                //             "dataProvider": "provider_webri",
                //             "dataConsumer": "string"
                //         }
                //     },
                //     "hasDuration": {
                //         "Duration": {
                //             "creationDate": 0,
                //             "startDate": 0,
                //             "endDate": 0
                //         }
                //     },
                //     "hasDuties/Obligations": {
                //         "Duties/Obligations": {
                //             "qualityOfData": "integer",
                //             "characteristics": "enum",
                //             "dataAvailability": true
                //         }
                //     },
                //     "hasIntendedUse": {
                //         "IntendedUse": {
                //             "processData": false,
                //             "shareDataWithThirdParty": false,
                //             "editData": false
                //         }
                //     },
                //     "hasLicenseGrant": {
                //         "LicenseGrant": {
                //             "copyData": false,
                //             "transferable": false,
                //             "exclusiveness": false,
                //             "revocable": false
                //         }
                //     },
                //     "DataStream": true,
                //     "DataExchangeAgreement": {
                //         "orig": "string",
                //         "dest": "string",
                //         "encAlg": "string",
                //         "signingAlg": "string",
                //         "hashAlg": "string",
                //         "ledgerContractAddress": "string",
                //         "ledgerSignerAddress": "string",
                //         "pooToPorDelay": 0,
                //         "pooToPopDelay": 0,
                //         "pooToSecretDelay": 0
                //     }
                // }
        }
    }
    return null;
});
