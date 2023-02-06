import { Card, Col } from 'react-bootstrap';
import { getAgreementState, ISOtoDate, secondsToDate } from '../../lib/utils';
import { useRouter } from 'next/router';

export default function ContractCard(props) {
    const router = useRouter();
    const {
        agreementId, dataOffering, state, agreementDates,
        id, data, dateCreated, user, offering
    } = props;

    function onClick() {
        if (dataOffering)
            router.push('/contracts/' + agreementId);
        else if (id)
            router.push('/offerings/dataPurchaseRequest/' + id);
    }

    function getOfferingTitle() {
        if (dataOffering)
            return dataOffering.dataOfferingTitle;
        return data.dataSharingAgreement.dataOfferingDescription.title;
    }

    function getStatus() {
        if (state !== undefined)
            return getAgreementState(state);
        return 'Pending';
    }

    function getProvider() {
        if (user.consumer) {
            return <Card.Text>Provider: {offering.provider}</Card.Text>;
        }
        return null;
    }

    return (
        <>
            <Col className="col-md-12">
                <Card className="overflow-hidden cursor-pointer mb-3" >
                    <Card.Body onClick={onClick}>
                        <div className="d-flex">
                            <Card.Text className="flex-grow-1">Offering: {getOfferingTitle()}</Card.Text>
                            Status: {getStatus()}
                        </div>

                        <div className="d-flex mt-3">
                            <div className="flex-grow-1">
                                {getProvider()}
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

                    { dateCreated
                        ? <div className="d-flex bg-light">
                            <Col>
                                <div className="d-flex flex-column align-items-center">
                                    <div>Purchase Request Date</div>
                                    {ISOtoDate(dateCreated, 'MM/DD/YYYY')}
                                </div>
                            </Col>
                        </div> : null
                    }
                </Card>
            </Col>
        </>
    );
}
