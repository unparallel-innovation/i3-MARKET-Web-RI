import { Button, Card, Col } from 'react-bootstrap';
import { getAgreementState, ts2date } from '../../lib/utils';
import { useRouter } from 'next/router';

export default function ContractCard(props) {
    const router = useRouter();
    const { agreementId, dataOffering, state, providerId, agreementDates, signed, user } = props;

    function onClick() {
        router.push('/contracts/' + agreementId);
    }

    return (
        <>
            <Col className="col-md-12">
                <Card className="overflow-hidden cursor-pointer mb-3" >
                    <Card.Body onClick={onClick}>
                        <div className="d-flex">
                            <Card.Text className="flex-grow-1">Offering: {dataOffering.dataOfferingId}</Card.Text>
                            Status: {getAgreementState(state)}
                        </div>

                        <div className="d-flex mt-3">
                            <div className="flex-grow-1">
                                { !user.provider ? (<Card.Text>Provider: {providerId}</Card.Text>) : null }
                            </div>
                            {/*<Button size='sm' style={{borderRadius: 10}}> Rating </Button>*/}
                        </div>

                    </Card.Body>
                    <div className="d-flex bg-light">
                        <Col>
                            <div className="d-flex flex-column align-items-center">
                                <div>Creation Date</div>
                                {ts2date(agreementDates[0], 'MM/DD/YYYY')}
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex flex-column align-items-center">
                                <div>Start Date</div>
                                {ts2date(agreementDates[1], 'MM/DD/YYYY')}
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex flex-column align-items-center">
                                <div>End Date</div>
                                {ts2date(agreementDates[2], 'MM/DD/YYYY')}
                            </div>
                        </Col>
                    </div>
                </Card>
            </Col>
        </>
    );
}
