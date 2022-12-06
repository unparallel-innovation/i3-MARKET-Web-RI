import { Accordion, Card, Row } from 'react-bootstrap';
import CustomToggle from '../../common/CustomToggle';
import KVCol from '../../common/KVCol';

export default  function HasLicenseGrant(props) {
    const {
        transferable, exclusiveness, paidUp, revocable, processing,
        modifying, analyzing, storingData, storingCopy, reproducing,
        distributing, loaning, selling, renting, furtherLicensing, leasing,
        eventKey
    } = props;

    return (
        <Accordion>
            <Card>
                <CustomToggle className="bg-white" eventKey={eventKey}>
                    <div className="text-tiny text-muted">Has License Grant</div>
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">
                        <Row className="text-center mt-3 bg-lightgray">
                            <KVCol title="Transferable">
                                { transferable.toString() }
                            </KVCol>
                            <KVCol title="Exclusiveness">
                                { exclusiveness.toString() }
                            </KVCol>
                            <KVCol title="Paid Up">
                                { paidUp.toString() }
                            </KVCol>
                            <KVCol title="Revocable">
                                { revocable.toString() }
                            </KVCol>
                        </Row>
                        <Row className="text-center bg-lightgray">
                            <KVCol title="Processing">
                                { processing.toString() }
                            </KVCol>
                            <KVCol title="Modifying">
                                { modifying.toString() }
                            </KVCol>
                            <KVCol title="Analyzing">
                                { analyzing.toString() }
                            </KVCol>
                            <KVCol title="Storing Data">
                                { storingData.toString() }
                            </KVCol>
                        </Row>
                        <Row className="text-center bg-lightgray">
                            <KVCol title="Storing Copy">
                                { storingCopy.toString() }
                            </KVCol>
                            <KVCol title="Reproducing">
                                { reproducing.toString() }
                            </KVCol>
                            <KVCol title="Distributing">
                                { distributing.toString() }
                            </KVCol>
                            <KVCol title="Loaning">
                                { loaning.toString() }
                            </KVCol>
                        </Row>
                        <Row className="text-center bg-lightgray">
                            <KVCol title="Selling">
                                { selling.toString() }
                            </KVCol>
                            <KVCol title="Renting">
                                { renting.toString() }
                            </KVCol>
                            <KVCol title="Further Licensing">
                                { furtherLicensing.toString() }
                            </KVCol>
                            <KVCol title="Leasing">
                                { leasing.toString() }
                            </KVCol>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
