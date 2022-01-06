import { Accordion, Card, Row } from 'react-bootstrap';
import CustomToggle from '../../common/CustomToggle';
import KVCol from '../../common/KVCol';

function HasIntendedUse(props) {
    const {
        processData, shareDataWithThirdParty,
        editData, eventKey
    } = props;

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
                                { processData }
                            </KVCol>
                            <KVCol title="Share Data With Third Party">
                                { shareDataWithThirdParty }
                            </KVCol>
                            <KVCol title="Edit Data">
                                { editData }
                            </KVCol>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

function HasLicenseGrant(props) {
    const {
        copyData, transferable,
        exclusiveness, revocable, eventKey
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
                            <KVCol title="Copy Data">
                                { copyData }
                            </KVCol>
                            <KVCol title="Transferable">
                                { transferable }
                            </KVCol>
                            <KVCol title="Exclusiveness">
                                { exclusiveness }
                            </KVCol>
                            <KVCol title="Revocable">
                                { revocable }
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
        interestOfProvider, interestDescription,
        hasGoverningJurisdiction, purpose,
        purposeDescription, hasIntendedUse,
        hasLicenseGrant, eventKey
    } = props;

    const hasIntendedUseEl = hasIntendedUse.map((intendedUse, idx) => (
        <HasIntendedUse key={intendedUse.intendedUseId}
            eventKey={`${eventKey}-hasIntendedUse${idx}`} { ...intendedUse } />
    ));

    const hasLicenseGrantEl = hasLicenseGrant.map((licenseGrant, idx) => (
        <HasLicenseGrant key={licenseGrant.licenseGrantId}
            eventKey={`${eventKey}-hasLicenseGrant${idx}`} { ...licenseGrant } />
    ));

    return (
        <Accordion>
            <Card>
                <CustomToggle eventKey={eventKey}
                    className="bg-primary text-white"
                >
                    <div className="text-tiny text-light">Contract Parameter</div>
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
