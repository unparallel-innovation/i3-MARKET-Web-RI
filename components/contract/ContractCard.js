import { Card, Col } from 'react-bootstrap';
import { getAgreementState, tsToDate } from '../../lib/utils';

export default function ContractCard(props){
    const { agreementId, dataOffering, state, providerId, agreementDates, signed, user } = props;

    function onClick(){
        // TODO open contract page
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
                        { !user.provider ? (<Card.Text className="mt-3">Provider: {providerId}</Card.Text>) : null }


                    </Card.Body>
                    <div className="d-flex bg-light">
                        <Col>
                            <div className="d-flex flex-column align-items-center">
                                <div>Creation</div>
                                {tsToDate(agreementDates[0])}
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex flex-column align-items-center">
                                <div>Start</div>
                                {tsToDate(agreementDates[1])}
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex flex-column align-items-center">
                                <div>End</div>
                                {tsToDate(agreementDates[2])}
                            </div>
                        </Col>
                    </div>
                </Card>
            </Col>
        </>
    )
}
