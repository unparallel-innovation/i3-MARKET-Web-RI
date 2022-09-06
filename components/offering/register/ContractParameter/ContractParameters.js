import { Form } from 'react-bootstrap';
import { useMap } from '../../../../lib/hooks';
import HasIntendedUse from './HasIntendedUse';
import HasLicenseGrant from './HasLicenseGrant';
import CustomLabel from '../../../common/CustomLabel';
import { useState } from 'react';

export default function ContractParameters(props) {
    const {
        interestOfProvider, interestDescription, purpose, purposeDescription,
        hasGoverningJurisdiction, hasIntendedUse, hasLicenseGrant, eventKey
    } = props;

    const [interest, setInterest] = useState(interestOfProvider);

    const [ hasIntendedUseC ] = useMap(eventKey, 'hasIntendedUse');
    const hasIntendedUseEl = <HasIntendedUse key={'hasIntendedUse'} eventKey={eventKey + 'hasIntendedUse0'} {...hasIntendedUse}/>;

    const [ hasLicenseGrantC ] = useMap(eventKey, 'hasLicenseGrant');
    const hasLicenseGrantEl = <HasLicenseGrant key={'hasLicenseGrantKey'} eventKey={eventKey + 'hasLicenseGrant0'} {...hasLicenseGrant} />;

    return (<>
        <Form.Group controlId={eventKey + 'interestOfProvider'}>
            <CustomLabel value="Interest Of Provider" tooltip="This property is used to identify the interest of the data owner/provider related to the trading/sharing of their data assets" />
            <Form.Control as="select" value={interest} name={eventKey + 'interestOfProvider'} onChange={e => { setInterest(e.target.value); }} >
                <option value="Free Sharing">Free Sharing </option>
                <option value="Quotation">Quotation</option>
                <option value="Selling of data">Selling of data</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId={eventKey + 'interestDescription'}>
            <CustomLabel value="Interest Description" tooltip="Data provider can specify which sort of quotation he wants exactly, e.g., quotation for maintenance service or quotation for optimization of production" />
            <Form.Control as="textarea" rows={3} name={eventKey + 'interestDescription'} defaultValue={interestDescription} />
        </Form.Group>

        <Form.Group controlId={eventKey + 'purpose'}>
            <CustomLabel value="Purpose" tooltip="Purpose of the Agreement" />
            <Form.Control type="text" name={eventKey + 'purpose'} defaultValue={purpose}/>
        </Form.Group>

        <Form.Group controlId={eventKey + 'purposeDescription'}>
            <CustomLabel value="Purpose Description" tooltip="In case full text description of describing the reasons behind the creation of the Agreement" />
            <Form.Control as="textarea" rows={3} name={eventKey + 'purposeDescription'} defaultValue={purposeDescription} />
        </Form.Group>

        <Form.Group controlId={eventKey + 'hasGoverningJurisdiction'}>
            <CustomLabel value="Has Governing Jurisdiction" tooltip="The file format of the distribution" />
            <Form.Control type="text" name={eventKey + 'hasGoverningJurisdiction'} defaultValue={hasGoverningJurisdiction} />
        </Form.Group>

        { hasIntendedUseEl }
        { hasLicenseGrantEl }

        <input type="hidden" value={hasIntendedUseC} name={eventKey + 'hasIntendedUseC'} />
        <input type="hidden" value={hasLicenseGrantC} name={eventKey + 'hasLicenseGrantC'} />
    </>);
}
