import {useRouter} from "next/router";
import {ExclamationCircle, Globe, Lock} from "react-bootstrap-icons";
import colors from "../../lib/colors";
import {Badge, Card, Col} from "react-bootstrap";

export default function OfferingCard(props) {
    const router = useRouter();
    const {
        title, description, active,
        hasContractWarning, dataOfferingId,
        activeContracts
    } = props;

    const visIconEl = active === "yes"
        ? <Globe color={colors.primary} size={24} />
        : <Lock color={colors.primary} size={24} />;

    let warningIconEl = null;

    if (hasContractWarning) {
        warningIconEl = (
            <span className="p-2 px-3 bg-warning">
        <ExclamationCircle size={24}/>
      </span>
        );
    }

    function onClick() {
        router.push('/offerings/' + dataOfferingId);
    }

    return (
        <Col xs="12" md="6" xl="4">
            <Card className="overflow-hidden cursor-pointer mb-3"
                  onClick={onClick}
            >
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between line-clamp-2 h3rem">
                        { title }
                        { visIconEl }
                    </Card.Title>
                    <Card.Text className="line-clamp-2 h3rem">
                        { description }
                    </Card.Text>
                </Card.Body>
                <div className="d-flex bg-light">
          <span className="p-2 flex-grow-1">
            <Badge pill variant="primary">
              { activeContracts || 0 } Contracts
            </Badge>
          </span>
                    { warningIconEl }
                </div>
            </Card>
        </Col>);
}
