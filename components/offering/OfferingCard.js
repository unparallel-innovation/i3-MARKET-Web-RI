import { useRouter } from 'next/router';
import { Badge, Card, Col } from 'react-bootstrap';
import { getOfferingStatusIcon } from '../../lib/utils';
import { ExclamationCircle } from 'react-bootstrap-icons';

export default function OfferingCard(props) {
    const router = useRouter();
    const {
        dataOfferingId, dataOfferingTitle, dataOfferingDescription, status,
        contracts = [], pendingContracts = [], hideContracts
    } = props;

    // 0 - created
    // 1 - active
    // 2 - updated
    // 3 - violated
    // 4 - terminated
    // 5 - pending (notification)
    const activeContracts = contracts.filter(c => c.state === 1).length;

    let warningIconEl = null;
    if (pendingContracts.length > 0) {
        warningIconEl = (
            <ExclamationCircle className="text-warning" size={24}/>
        );
    }

    const iconStatusEl = (
        <span className="">
            {getOfferingStatusIcon(status)}
        </span>
    );

    function onClick() {
        router.push('/offerings/' + dataOfferingId);
    }

    function onContractsClick() {
        // TODO fix path, should be offerings/offeringId/contracts
        // if (activeContracts > 0)
        if (hideContracts)
            onClick();
        else
            router.push('/offerings/contracts/' + dataOfferingId);
    }

    return (
        <Col xs="12" md="6" xl="4">
            <Card className="overflow-hidden cursor-pointer mb-3" >
                <Card.Body onClick={onClick}>
                    <Card.Title className="d-flex justify-content-between line-clamp-2 h3rem">
                        { dataOfferingTitle }
                        { iconStatusEl }
                    </Card.Title>
                    <Card.Text className="line-clamp-2 h3rem">
                        { dataOfferingDescription }
                    </Card.Text>
                </Card.Body>
                <div className="d-flex bg-light px-3 p-2 py-1 align-items-center" onClick={onContractsClick}>
                    <span className="flex-grow-1">
                        <Badge pill variant="primary" className={hideContracts ? 'invisible' : ''}>
                            {activeContracts} Contracts
                        </Badge>
                    </span>
                    { warningIconEl }
                </div>
            </Card>
        </Col>
    );
}
