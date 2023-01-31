import { useState } from 'react';
import BigText from '../common/BigText';
import ContractCard from './ContractCard';
import Layout from '../layout/Layout';
import { Button, Form, Row } from 'react-bootstrap';
import { getAgreementState } from '../../lib/utils';

export default function ContractsList(props) {
    const { contracts, user } = props;
    const [ state, setState] = useState('all');
    const [ ref, setRef ] = useState('');

    if (contracts.length === 0)
        return <BigText>No contracts found!</BigText>;

    // TODO add filters
    // consumer: state and provider (filter) end date (sort)
    // provider: state (filter) end date (sort)

    const agreementStates = [
        'all',
        'created',
        'active',
        'updated',
        'violated',
        'terminated',
        'pending'
    ];

    const states = agreementStates.map((item, idx) => (
        <option key={idx + 1} value={item}>
            {item}
        </option>
    ));

    const contractCards = contracts.filter(function (contract) {
        if (state === 'all')
            return contract;
        else if (state === 'pending')
            return contract.status === 'Pending';
        else
            return getAgreementState(contract.state).toLowerCase() === state;
    }).map(function (contract) {
        return <ContractCard key={contract.agreementId ? contract.agreementId : contract.id} {...contract} user={user}/>;
    });

    const contractsEl = contractCards.length > 0
        ? <Row>{contractCards}</Row>
        : <div className="d-flex h-100 h3 text-lightgray justify-content-center align-items-center">No results!</div>;

    function onChange(e) {
        setRef(e.target.value);
    }

    return (
        <Layout>
            <div className="d-flex flex-column px-5 h-100">
                <div className="d-flex mb-3">
                    <Form.Control ref={setRef} as="select" className="dropdown-custom mr-3" onChange={onChange}>
                        {states}
                    </Form.Control>
                    <Button type="submit" onClick={() => setState(ref)}>Search</Button>
                </div>
                { contractsEl }
            </div>
        </Layout>
    );
}
