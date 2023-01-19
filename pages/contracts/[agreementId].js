import { useRouter } from 'next/router';
import { useData } from '../../lib/hooks';
import Error from '../../components/layout/Error';
import ContractParameters from '../../components/contract/ContractParameters';
import { Button, Form } from 'react-bootstrap';
import Layout from '../../components/layout/Layout';
import { Loading } from '../../components/layout/Loading';

export default function ContractPage() {
    const router = useRouter();
    const { agreementId } = router.query;
    const { data, error, isValidating } = useData(`/api/contracts/${agreementId}`);

    if (isValidating)
        return <Loading />;

    if (error)
        return <Error error={error} />;

    function onBack() {
        router.back();
    }

    return (
        <Layout>
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1">
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">Contract Details</h3>
                    <Button variant="secondary" onClick={onBack}>Back</Button>
                </div>
                <ContractParameters {...data} disableInput isAgreement/>
            </Form>
        </Layout>
    );
}
