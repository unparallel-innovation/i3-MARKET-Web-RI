import { Button, Form } from 'react-bootstrap';
import Layout from '../layout/Layout';
import { useRouter } from 'next/router';
import { formDataPurchaseRequest } from '../../lib/forms/dataPurchaseRequest';

import ContractParameters from './ContractParameters';
import Error from '../layout/Error';

export default function ContractTemplate(props) {
    const router = useRouter();

    if (props.user.provider) {
        const error = { message: 'Sorry, you don\'t have permission to access this page!' };
        return <Error error={error}/>;
    }

    function onCancel() {
        router.back();
    }

    function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const fd = new FormData(form);
        const res = formDataPurchaseRequest(fd);

        // TODO generate public/private keys
        // send public key to backend

        fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(res),
        }).then(res => {

            fetch('/api/notificationWebhook').then(n => {
                router.back();
            });
        });
    }

    return (
        <Layout className="d-flex flex-column">
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1" onSubmit={onSubmit} action={'/api/offerings/purchaseRequest'}>
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">Contract Template</h3>
                    <Button variant="secondary" className="mr-3" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Data Purchase Request</Button>
                </div>
                <ContractParameters {...props}/>
            </Form>
        </Layout>
    );
}
