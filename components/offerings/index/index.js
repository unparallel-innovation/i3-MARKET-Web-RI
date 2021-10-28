import { useRouter } from 'next/router';
import Layout from '/components/Layout.js';
import { Row } from 'react-bootstrap';
import OfferingCard from '../OfferingCard';
import { AddNew } from '/components/buttons.js';

export default
function Offerings(props) {
    const { offerings } = props;
    const router = useRouter();

    const offeringsEl = offerings.map(offering => (
        <OfferingCard key={offering.dataOfferingId} {...offering} />
    ));

    function onClick() {
        router.push('/offerings/register');
    }

    return (
        <Layout>
            <div className="px-5">
                <div className="d-flex align-items-center mb-2">
                    <div className="flex-grow-1"/>
                    <AddNew onClick={onClick} />
                </div>
                <Row>
                    { offeringsEl }
                </Row>
            </div>
        </Layout>);
}
