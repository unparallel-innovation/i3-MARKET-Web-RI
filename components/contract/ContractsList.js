import { useState } from 'react';
import { useRouter } from 'next/router';
import BigText from '../common/BigText';
import ContractCard from './ContractCard';
import Layout from '../layout/Layout';
import { Button, Form, Row } from 'react-bootstrap';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';

export default function ContractsList(props) {
    const router = useRouter();
    const { contracts, user } = props;
    const [ state, setState] = useState('all');
    const [ sort, setSort] = useState('down');
    const [ ref, setRef ] = useState('');

    if (contracts.length === 0)
        return <BigText>No contracts found!</BigText>;

    // TODO add filters
    // consumer: provider (filter)

    const agreementStates = [
        'all',
        'active',
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
            return contract.stateValue === state;
    }).sort((a,b) => {
        if (sort === 'up') {
            if (a.data || b.data)
                return 99999;
            return a.agreementDates[2] - b.agreementDates[2];
        } else {
            if (a.data || b.data)
                return -1;
            return b.agreementDates[2] - a.agreementDates[2];
        }
    }).map(function (contract) {
        return <ContractCard key={contract.agreementId ? contract.agreementId : contract.id} {...contract} user={user}/>;
    });

    const contractsEl = contractCards.length > 0
        ? <Row>{contractCards}</Row>
        : <div className="d-flex h-100 h3 text-lightgray justify-content-center align-items-center">No results!</div>;

    function onChange(e) {
        setRef(e.target.value);
    }

    function onCancel() {
        router.back();
    }
    function getOfferingTitle() {
        const createdContract = contracts.find(el=>el.dataOffering);
        if (createdContract)
            return createdContract.dataOffering.dataOfferingTitle;

        const pendingContract = contracts.find(el=>el.data);
        if (pendingContract)
            return pendingContract.data.dataSharingAgreement.dataOfferingDescription.title;
    }

    return (
        <Layout>
            <div className="d-flex flex-column px-5 h-100">
                { user.provider
                    ? <>
                        <div className="d-flex">
                            <h3 className="flex-grow-1">Contract List for {getOfferingTitle()}</h3>
                            <Button variant="secondary" onClick={onCancel}>Back</Button>
                        </div>
                        <hr/>
                    </> : null }
                <div className="d-flex my-3">
                    <Form.Control ref={setRef} as="select" className="dropdown-custom mr-3" onChange={onChange}>
                        {states}
                    </Form.Control>
                    <Button type="submit" onClick={() => setState(ref)}>Search</Button>

                    <span className="flex-grow-1"/>

                    <Button type="submit" onClick={() => setSort(sort === 'up' ? 'down' : 'up')}>
                        End Date
                        { sort === 'up' ? <ArrowUp size={24}/> : <ArrowDown size={24} />}
                    </Button>
                </div>
                { contractsEl }
            </div>
        </Layout>
    );
}
