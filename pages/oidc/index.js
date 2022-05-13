import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../lib/hooks';
import { useRouter } from 'next/router';

export default function Oidc() {
    const router = useRouter();
    const [oidc, setOidc] = useState('');
    const { data } = useData('/api/oidc/');

    function onSubmit(e) {
        e.preventDefault();

        fetch('/api/oidc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(oidc),
        }).then(res => {
            router.reload();
        });
    }

    if (data) {
        const redirectUri = `${window.location.origin}/api/credential`;
        const logoutRedirectUri = `${window.location.origin}/auth`;
        return (
            <div className="d-flex flex-column vh-100">
                <Form className="p-5" onSubmit={onSubmit}>
                    <h1>OIDC Client Configuration</h1>
                    <br/>
                    <div>For support authentication, Web-RI must have an OIDC Client registered. If you have the client configuration, please paste it in the text area.</div>
                    <br/>
                    <div>No OIDC Client registered? Please follow the following steps:</div>
                    <div className="ml-3">
                        1. Use this <a href={`${data.oidc_url}/api-spec/ui/#/Developers/get_release2_developers_login`} target="_blank" rel="noreferrer">endpoint</a> to get an initial token for registering a new client.
                    </div>
                    <div className="ml-3">
                        2. Then <a href={`${data.oidc_url}/api-spec/ui/#/Developers/post_release2_oidc_reg`} target="_blank" rel="noreferrer">here</a>, using the access token as bearerToken (press the lock symbol to open the form to paste the token), you can register a new client.
                    </div>
                    <div className="ml-4">Please note, you must add the following information:
                        <br/>- <code>{redirectUri}</code> in <strong>redirect_uris</strong> field
                        <br/>- <code>{logoutRedirectUri}</code> in <strong>post_logout_redirect_uris </strong> field.
                        <br/>Otherwise, the authentication flow will not work.</div>
                    <div className="ml-3">After successfully client registration, you can paste its information in the text area below.</div>
                    <div>For more information you can access <a href={'https://i3-market.gitlab.io/code/backplane/backplane-api-gateway/backplane-api-specification/systems/trust-security-privacy/ssi-iam/user-centric-authentication.html'} target="_blank" rel="noreferrer">here</a>.</div>
                    <Form.Group className="mt-4" controlId="oidc">
                        <Form.Control as="textarea" rows={18} value={oidc} placeholder="Client configuration"
                            name="oidc" onChange={e => { setOidc(e.target.value); }} required/>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
    return '';
}
