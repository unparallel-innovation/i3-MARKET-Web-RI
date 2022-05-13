import { Form } from 'react-bootstrap';
import { useMap } from '../../../../lib/hooks';
import HasIntendedUse from './HasIntendedUse';
import HasLicenseGrant from './HasLicenseGrant';

export default function ContractParameter(props) {
    const {
        interestOfProvider, interestDescription, purpose, purposeDescription,
        hasGoverningJurisdiction, hasIntendedUse, hasLicenseGrant, eventKey
    } = props;

    const [ hasIntendedUseC ] = useMap(eventKey, 'hasIntendedUse');
    const hasIntendedUseEl = <HasIntendedUse key={'hasIntendedUse'} eventKey={eventKey + 'hasIntendedUse0'} {...hasIntendedUse}/>;

    const [ hasLicenseGrantC ] = useMap(eventKey, 'hasLicenseGrant');
    const hasLicenseGrantEl = <HasLicenseGrant key={'hasLicenseGrantKey'} eventKey={eventKey + 'hasLicenseGrant0'} {...hasLicenseGrant} />;

    return (<>
        <Form.Group controlId={eventKey + 'interestOfProvider'}>
            <Form.Label>Interest Of Provider</Form.Label>
            <Form.Control type="text" placeholder="Interest Of Provider"
                name={eventKey + 'interestOfProvider'} defaultValue={interestOfProvider} />
        </Form.Group>

        <Form.Group controlId={eventKey + 'interestDescription'}>
            <Form.Label>Interest Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Interest Description"
                name={eventKey + 'interestDescription'} defaultValue={interestDescription} />
        </Form.Group>

        <Form.Group controlId={eventKey + 'purpose'}>
            <Form.Label>Purpose</Form.Label>
            <Form.Control type="text" placeholder="Purpose"
                name={eventKey + 'purpose'} defaultValue={purpose}/>
        </Form.Group>

        <Form.Group controlId={eventKey + 'purposeDescription'}>
            <Form.Label>Purpose Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Purpose Description"
                name={eventKey + 'purposeDescription'} defaultValue={purposeDescription} />
        </Form.Group>

        <Form.Group controlId={eventKey + 'hasGoverningJurisdiction'}>
            <Form.Label>Has Governing Jurisdiction</Form.Label>
            <Form.Control type="text" placeholder="Has Governing Jurisdiction"
                name={eventKey + 'hasGoverningJurisdiction'} defaultValue={hasGoverningJurisdiction} />
        </Form.Group>

        { hasIntendedUseEl }
        { hasLicenseGrantEl }

        <input type="hidden" value={hasIntendedUseC} name={eventKey + 'hasIntendedUseC'} />
        <input type="hidden" value={hasLicenseGrantC} name={eventKey + 'hasLicenseGrantC'} />
    </>);
}
