import { useRouter } from 'next/router';
import { Badge, Card, Col } from 'react-bootstrap';
import { getOfferingStatusIcon, isBoolean } from '../../lib/utils';
import { ExclamationCircle } from 'react-bootstrap-icons';

export default function OfferingCard(props) {
    const router = useRouter();
    const {
        dataOfferingId, dataOfferingTitle, dataOfferingDescription, status,
        contracts = [], pendingContracts = [], hideContracts, localNodeSearch
    } = props;

    // 0 - active
    // 1 - violated
    // 2 - terminated
    const activeContracts = contracts.filter(c => c.state === 0).length;

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

    function onClick(e) {
        e.stopPropagation();
        if (localNodeSearch)
            router.push('/offerings/local/' + dataOfferingId);
        else
            router.push('/offerings/' + dataOfferingId);
    }

    function onContractsClick(e) {
        e.stopPropagation();
        if (activeContracts > 0) {
            router.push('/offerings/contracts/' + dataOfferingId);
        }
    }

    return (
        <Col xs="12" md="6" xl="4">
            <Card className="overflow-hidden cursor-pointer mb-3" onClick={onClick}>
                <Card.Body >
                    <Card.Title className="d-flex justify-content-between line-clamp-2 h3rem">
                        { dataOfferingTitle }
                        { iconStatusEl }
                    </Card.Title>
                    <Card.Text className="line-clamp-2 h3rem">
                        { dataOfferingDescription }
                    </Card.Text>
                </Card.Body>
                <div className="d-flex bg-light px-3 p-2 py-1 align-items-center">
                    <span className="flex-grow-1">
                        <Badge pill variant="primary" className={hideContracts ? 'invisible' : ''} onClick={onContractsClick}>
                            {activeContracts} Contracts
                        </Badge>
                    </span>
                    { warningIconEl }
                </div>
            </Card>
        </Col>
    );
}
