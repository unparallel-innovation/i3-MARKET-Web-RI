import { catchErrors, connector } from '../../../lib/server';
import jsonrepair from 'jsonrepair';

export default catchErrors(async (req, res) => {
    let oidcClient
    const prevOidcClient = process.env.OIDC_CLIENT;

    if(!prevOidcClient){
        // create a new oidc client
        const redirectUri = `http://${req.headers.host}/api/credential`;
        const logoutRedirectUri = `http://${req.headers.host}/auth`;
        const newOidcClient = await connector.registerNewClient(process.env.OIDC_URL, 'Web-RI', redirectUri, logoutRedirectUri);
        const json = jsonrepair(JSON.stringify(newOidcClient));
        process.env.OIDC_CLIENT = json;
        oidcClient = json;
    }
    else{
        oidcClient = prevOidcClient;
    }
    return { hasClient: oidcClient !== undefined }
});
