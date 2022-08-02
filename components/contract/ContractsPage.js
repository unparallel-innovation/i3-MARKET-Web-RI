import { useState } from 'react';
import BigText from '../common/BigText';
import ContractCard from './ContractCard';
import Layout from '../layout/Layout';
import { Row } from 'react-bootstrap';

export default function ContractsPage(props) {
    const { contracts } = props;

    const [c, setC] = useState(contracts);

    if(c.length === 0)
        return <BigText>No contracts found!</BigText>;

    const contractsEl = c.map(contract => (
        <ContractCard key={contract.agreementId} {...contract} />
    ))

    return (
        <Layout>
            <div className="px-5">
                <Row>
                    { contractsEl }
                </Row>
            </div>
        </Layout>
    );
}
