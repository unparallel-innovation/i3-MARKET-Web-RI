import { catchErrors, connector } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    switch (req.method) {
        case 'POST':
            const credential = req.body
            const ic_url = connector.getIssueCredentialUrl(process.env.OIDC_URL, credential, `${req.headers.origin}/login`);
            return {url: ic_url};
    }
});
