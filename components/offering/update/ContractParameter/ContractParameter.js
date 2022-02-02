import { Col, Form, Row } from 'react-bootstrap';
import HasIntendedUse from './HasIntendedUse';
import HasLicenseGrant from './HasLicenseGrant';

export default function ContractParameter(props) {
    const {
        interestOfProvider, interestDescription, purpose,
        purposeDescription, hasGoverningJurisdiction,
        hasIntendedUse, hasLicenseGrant, eventKey
    } = props;

    const hasIntendedUseEl = hasIntendedUse.map((item, idx) => (
        <HasIntendedUse key={item.intendedUseId} eventKey={`${eventKey}hasIntendedUse${idx}`} { ...item } />
    ));

    const hasLicenseGrantEl = hasLicenseGrant.map((item, idx) => (
        <HasLicenseGrant key={item.licenseGrantId} eventKey={`${eventKey}hasLicenseGrant${idx}`} { ...item } />
    ));

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'interestOfProvider'}>
                        <Form.Label>Interest Of Provider</Form.Label>
                        <Form.Control placeholder="Interest Of Provider"
                            name={eventKey + 'interestOfProvider'} defaultValue={interestOfProvider}
                        />
                    </Form.Group>
                </Col>

            </Row>

            <Form.Group controlId={eventKey + 'interestDescription'}>
                <Form.Label>Interest Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Interest Description"
                    name={eventKey + 'interestDescription'} defaultValue={interestDescription}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'purpose'}>
                        <Form.Label>Purpose</Form.Label>
                        <Form.Control placeholder="Purpose" name={eventKey + 'purpose'}
                            defaultValue={purpose}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'hasGoverningJurisdiction'}>
                        <Form.Label>Has Governing Jurisdiction</Form.Label>
                        <Form.Control placeholder="Has Governing Jurisdiction"
                            name={eventKey + 'hasGoverningJurisdiction'} defaultValue={hasGoverningJurisdiction}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId={eventKey + 'purposeDescription'}>
                <Form.Label>Purpose Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Purpose Description"
                    name={eventKey + 'purposeDescription'} defaultValue={purposeDescription}
                />
            </Form.Group>

            <div className="d-flex align-items-center my-4">
                <h5 className="flex-grow-1 mb-0">Has Intended Use</h5>
            </div>

            { hasIntendedUseEl }

            <div className="d-flex align-items-center my-4">
                <h5 className="flex-grow-1 mb-0">Has License Grant</h5>
            </div>

            { hasLicenseGrantEl }
        </>
    );
}
