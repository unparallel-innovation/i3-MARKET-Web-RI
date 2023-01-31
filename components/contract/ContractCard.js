import { Card, Col } from 'react-bootstrap';
import { getAgreementState, secondsToDate } from '../../lib/utils';
import { useRouter } from 'next/router';

export default function ContractCard(props) {
    const router = useRouter();
    const {
        agreementId, dataOffering, state, providerId, agreementDates,
        id, data, dateCreated, user
    } = props;

    function onClick() {
        if (dataOffering)
            router.push('/contracts/' + agreementId);
        else if (id)
            router.push('/offerings/dataPurchaseRequest/' + id);
    }

    function getOfferingId() {
        if (dataOffering)
            return dataOffering.dataOfferingId;
        return data.dataSharingAgreement.dataOfferingDescription.dataOfferingId;
    }

    function getStatus() {
        if (state !== undefined)
            return getAgreementState(state);
        return 'Pending';
    }

    return (
        <>
            <Col className="col-md-12">
                <Card className="overflow-hidden cursor-pointer mb-3" >
                    <Card.Body onClick={onClick}>
                        <div className="d-flex">
                            <Card.Text className="flex-grow-1">Offering: {getOfferingId()}</Card.Text>
                            Status: {getStatus()}
                        </div>

                        <div className="d-flex mt-3">
                            <div className="flex-grow-1">
                                { !user.provider ? (<Card.Text>Provider: {providerId}</Card.Text>) : null }
                            </div>
                            {/*<Button size='sm' style={{borderRadius: 10}}> Rating </Button>*/}
                        </div>

                    </Card.Body>

                    { agreementDates
                        ? <div className="d-flex bg-light">
                            <Col>
                                <div className="d-flex flex-column align-items-center">
                                    <div>Creation Date</div>
                                    {secondsToDate(agreementDates[0], 'MM/DD/YYYY')}
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column align-items-center">
                                    <div>Start Date</div>
                                    {secondsToDate(agreementDates[1], 'MM/DD/YYYY')}
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column align-items-center">
                                    <div>End Date</div>
                                    {secondsToDate(agreementDates[2], 'MM/DD/YYYY')}
                                </div>
                            </Col>
                        </div> : null
                    }
                </Card>
            </Col>
        </>
    );
}
