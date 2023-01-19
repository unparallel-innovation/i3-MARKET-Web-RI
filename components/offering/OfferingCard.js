import { useRouter } from 'next/router';
import { Badge, Card, Col } from 'react-bootstrap';
import { getOfferingStatusIcon } from '../../lib/utils';

export default function OfferingCard(props) {
    const router = useRouter();
    const {
        dataOfferingId, dataOfferingTitle, dataOfferingDescription, status,
        contracts = [], hideContracts
    } = props;

    // 0 - created
    // 1 - active
    // 2 - updated
    // 3 - violated
    // 4 - terminated
    // 5 - pending ?
    const activeContracts = contracts.filter(c => c.state === 1).length;

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

    function onContractsClick() {
        // TODO fix path, should be offerings/offeringId/contracts
        // if (activeContracts > 0)
            router.push('/offerings/contracts/' + dataOfferingId);
    }

    return (
        <Col xs="12" md="6" xl="4">
            <Card className="overflow-hidden cursor-pointer mb-3" >
                <Card.Body onClick={onClick}>
                    <Card.Title className="d-flex justify-content-between line-clamp-2 h3rem">
                        { dataOfferingTitle }
                    </Card.Title>
                    <Card.Text className="line-clamp-2 h3rem">
                        { dataOfferingDescription }
                    </Card.Text>
                </Card.Body>
                <div className="d-flex bg-light px-3 py-1 align-items-center">
                    <span className="flex-grow-1">
                        {!hideContracts ? (
                            <Badge pill variant="primary" onClick={onContractsClick}>
                                {activeContracts} Contracts
                            </Badge>) : null
                        }
                    </span>
                    {iconStatusEl}
                </div>
            </Card>
        </Col>
    );
}
