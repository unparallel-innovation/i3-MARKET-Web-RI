import { useState } from 'react';
import BigText from '../common/BigText';
import ContractCard from './ContractCard';
import Layout from '../layout/Layout';

export default function ContractsPage(props) {
    const { contracts, user } = props;

    const [c, setC] = useState(contracts);

    if(c.length === 0)
        return <BigText>No contracts found!</BigText>;


    // TODO add filters
    // consumer: state and provider (filter) end date (sort)
    // provider: state (filter) end date (sort)

    const contractsEl = c.map(contract => (
        <ContractCard key={contract.agreementId} {...contract} user={user}/>
    ))

    return (
        <Layout>
            <div className="d-flex flex-column px-5">
                { contractsEl }
            </div>
        </Layout>
    );
}
