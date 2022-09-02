import Layout from '../layout/Layout';
import { Form } from 'react-bootstrap';
import ContractParameters from './ContractParameters';

export default function Contract(props){
    return (
        <Layout>
            <Form className="px-5 pb-3 d-flex flex-column flex-grow-1">
                <div className="d-flex">
                    <h3 className="flex-grow-1 mb-0">{'Contract Details'}</h3>
                </div>
                <ContractParameters data={props} disableInput />
            </Form>
        </Layout>
    )
}
