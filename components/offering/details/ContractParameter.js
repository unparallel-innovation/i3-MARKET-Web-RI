import { Accordion, Card, Row } from 'react-bootstrap';
import CustomToggle from '../../common/CustomToggle';
import KVCol from '../../common/KVCol';

function HasIntendedUse(props) {
    const { processData, shareDataWithThirdParty, editData, eventKey } = props;

    return (
        <Accordion>
            <Card>
                <CustomToggle className="bg-white" eventKey={eventKey}>
                    <div className="text-tiny text-muted">Has Intended Use</div>
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">

                        <Row className="text-center mt-3 bg-lightgray">
                            <KVCol title="Process Data">
                                { processData.toString() }
                            </KVCol>
                            <KVCol title="Share Data With Third Party">
                                { shareDataWithThirdParty.toString() }
                            </KVCol>
                            <KVCol title="Edit Data">
                                { editData.toString() }
                            </KVCol>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

function HasLicenseGrant(props) {
    const { copyData, transferable, exclusiveness, revocable, eventKey } = props;

    return (
        <Accordion>
            <Card>
                <CustomToggle className="bg-white" eventKey={eventKey}>
                    <div className="text-tiny text-muted">Has License Grant</div>
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">
                        <Row className="text-center mt-3 bg-lightgray">
                            <KVCol title="Copy Data">
                                { copyData.toString() }
                            </KVCol>
                            <KVCol title="Transferable">
                                { transferable.toString() }
                            </KVCol>
                            <KVCol title="Exclusiveness">
                                { exclusiveness.toString() }
                            </KVCol>
                            <KVCol title="Revocable">
                                { revocable.toString() }
                            </KVCol>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default
function ContractParameter(props) {
    const {
        interestOfProvider, interestDescription, hasGoverningJurisdiction, purpose,
        purposeDescription, hasIntendedUse, hasLicenseGrant, eventKey
    } = props;

    const hasIntendedUseEl =
        <HasIntendedUse
            key={'hasIntendedUseKey'} eventKey={`${eventKey}-hasIntendedUse`} { ...hasIntendedUse }
        />

    const hasLicenseGrantEl =
        <HasLicenseGrant
            key={'hasLicenseGrantKey'} eventKey={`${eventKey}-hasLicenseGrant`} { ...hasLicenseGrant }
        />

    return (
        <Accordion>
            <Card>
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    <div className="text-tiny text-light">Contract Parameters</div>
                </CustomToggle>

                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Row className="text-center mb-3">
                            <KVCol title="Interest Of Provider">
                                { interestOfProvider }
                            </KVCol>
                            <KVCol title="Interest Description">
                                { interestDescription }
                            </KVCol>
                        </Row>

                        <Row className="text-center mb-3">
                            <KVCol title="Purpose">
                                { purpose }
                            </KVCol>
                            <KVCol title="Purpose Description">
                                { purposeDescription }
                            </KVCol>
                        </Row>

                        <Row className="text-center mb-3">
                            <KVCol title="Has Governing Jurisdiction">
                                { hasGoverningJurisdiction }
                            </KVCol>
                        </Row>

                        { hasIntendedUseEl }

                        <div className="mt-2" />

                        { hasLicenseGrantEl }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
