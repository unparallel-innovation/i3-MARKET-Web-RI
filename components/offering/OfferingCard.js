import { useRouter } from 'next/router';
import { Badge, Card, Col } from 'react-bootstrap';
import { getOfferingStatusIcon } from '../../lib/utils';

export default function OfferingCard(props) {
    const router = useRouter();
    const {
        dataOfferingId, dataOfferingTitle, dataOfferingDescription, status
    } = props;

    // let warningIconEl = null;
    // if (hasContractWarning) {
    //     warningIconEl = (
    //         <span className="p-2 px-3 bg-warning">
    //             <ExclamationCircle size={24}/>
    //         </span>
    //     );
    // }

    const iconStatusEl = (
        <span className="p-2 px-3 ">
            {getOfferingStatusIcon(status)}
        </span>
    );

    function onClick() {
        router.push('/offerings/' + dataOfferingId);
    }

    return (
        <Col xs="12" md="6" xl="4">
            <Card className="overflow-hidden cursor-pointer mb-3" onClick={onClick}>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between line-clamp-2 h3rem">
                        { dataOfferingTitle }

                    </Card.Title>
                    <Card.Text className="line-clamp-2 h3rem">
                        { dataOfferingDescription }
                    </Card.Text>
                </Card.Body>
                <div className="d-flex bg-light">
                    <span className="p-2 flex-grow-1">
                        <Badge pill variant="primary">
                            0 Contracts
                        </Badge>
                    </span>
                    {iconStatusEl}
                </div>
            </Card>
        </Col>
    );
}
