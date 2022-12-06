import { Accordion, Card, Row } from 'react-bootstrap';
import CustomToggle from '../../common/CustomToggle';
import KVCol from '../../common/KVCol';
import HasIntendedUse from './HasIntendedUse';
import HasLicenseGrant from './HasLicenseGrant';

export default
function ContractParameters(props) {
    const {
        interestOfProvider, interestDescription, hasGoverningJurisdiction, purpose,
        purposeDescription, hasIntendedUse, hasLicenseGrant, eventKey
    } = props;

    const hasIntendedUseEl
        = <HasIntendedUse
            key={'hasIntendedUseKey'} eventKey={`${eventKey}-hasIntendedUse`} { ...hasIntendedUse }
        />;

    const hasLicenseGrantEl
        = <HasLicenseGrant
            key={'hasLicenseGrantKey'} eventKey={`${eventKey}-hasLicenseGrant`} { ...hasLicenseGrant }
        />;

    return (
        <Accordion>
            <Card>
                <CustomToggle eventKey={eventKey} className="bg-secondary text-white">
                    <div className="text-tiny text-light">Contract Parameters</div>
                </CustomToggle>

                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">
                        <Row className="text-center bg-lightgray">
                            <KVCol title="Interest Of Provider">
                                { interestOfProvider }
                            </KVCol>
                            <KVCol title="Interest Description">
                                { interestDescription }
                            </KVCol>
                        </Row>

                        <Row className="text-center bg-lightgray">
                            <KVCol title="Purpose">
                                { purpose }
                            </KVCol>
                            <KVCol title="Purpose Description">
                                { purposeDescription }
                            </KVCol>
                        </Row>

                        <Row className="text-center mb-3 bg-lightgray">
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
