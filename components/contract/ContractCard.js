import { Card, Col } from 'react-bootstrap';
import { capitalize, ISOtoDate, secondsToDate } from '../../lib/utils';
import { useRouter } from 'next/router';
import StarRating from '../common/StarRating';
import { getAverage } from '../../lib/utils';

export default function ContractCard(props) {
    const router = useRouter();
    const {
        agreementId, dataOffering, state, stateValue, agreementDates,
        id, data, dateCreated, user, provider, rating, isRated
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
            return capitalize(stateValue);
        return 'Pending';
    }

    function getProvider() {
        if (user.consumer) {
            return <Card.Text>Provider: {provider}</Card.Text>;
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

                        <div className="d-flex mt-3 align-items-center">
                            <div className="flex-grow-1">
                                {getProvider()}
                            </div>
                            {(isRated)
                                ? <StarRating rating={ getAverage(rating.subRatings) } style={{ marginTop: '-5px', paddingRight:'8px' }}></StarRating>
                                : <>Rating: Not rated</>
                            }

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
