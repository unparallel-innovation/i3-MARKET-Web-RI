import { Button, Form } from 'react-bootstrap';
import Layout from '../layout/Layout';
import { useRouter } from 'next/router';
import { formDataPurchaseRequest } from '../../lib/forms/dataPurchaseRequest';
import ContractParameters from './ContractParameters';
import Error from '../layout/Error';
import { parseJwk, generateKeys } from '@i3m/non-repudiation-library';
import { walletApi } from '../../lib/walletApi';

export default function ContractTemplate(props) {
    const router = useRouter();

    if (props.user.provider) {
        const error = { message: 'Sorry, you don\'t have permission to access this page!' };
        return <Error error={error}/>;
    }

    function onCancel() {
        router.back();
    }

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const fd = new FormData(form);
        const template = formDataPurchaseRequest(fd);

        // generate consumer keys
        const signingAlg = template.dataExchangeAgreement.signingAlg;
        const consumerKeys = await generateKeys(signingAlg);

        // add consumer public key to template
        template.dataExchangeAgreement.dest = await parseJwk(consumerKeys.publicJwk, true);

        // save consumer keys in wallet
        const wallet = await walletApi();

        // save as keyPair
        const resource = {
            type: 'KeyPair',
            name: 'Consumer KeyPair',
            identity: props.user.DID,
            resource: {
                keyPair: {
                    privateJwk: await parseJwk(consumerKeys.privateJwk, true),
                    publicJwk: await parseJwk(consumerKeys.publicJwk, true)
                }
            }
        };
        await wallet.resources.create(resource);
        console.log('Key Pair saved in Wallet (Consumer)');

        // create data purchase request
        fetch('/api/offering/purchaseRequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(template),
        }).then(r => {
            router.back();
        });
    }

    return (
        <Layout className="d-flex flex-column">
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit}>
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">Data Purchase Request</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </div>
                <ContractParameters {...props}/>
            </Form>
        </Layout>
    );
}
