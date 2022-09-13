import { Col, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import { capitalize } from '../../../lib/utils';
import { useState } from 'react';
import CustomLabel from '../../common/CustomLabel';

export default function General(props) {
    const {
        dataOfferingTitle, dataOfferingDescription, marketId, marketDid,
        owner, ownerDid, provider, providerDid, category, dataOfferingExpirationTime,
        active, ownerConsentForm, inSharedNetwork, personalData,
        categories, user, market_name, toUpdate
    } = props;

    const [personal, setPersonal] = useState(personalData);
    const [shared, setShared] = useState(inSharedNetwork);

    const categoryEl = categories.map(({ name }) => (
        <option key={name} value={name}>{ name }</option>
    ));

    return (<>
        <Form.Group controlId="title">
            <CustomLabel value="Title" tooltip="The title of the DataOffering" required />
            <Form.Control type="text" name="title" defaultValue={dataOfferingTitle} required />
        </Form.Group>

        <Form.Group controlId="description">
            <CustomLabel value="Description" tooltip="A description of the DataOffering" required />
            <Form.Control as="textarea" rows={3} name="description" defaultValue={dataOfferingDescription} required/>
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId="provider">
                    <CustomLabel value="Provider" tooltip="Provider of the DataOffering" required />
                    <Form.Control type="text" name="provider" defaultValue={toUpdate ? provider : user.username} disabled/>
                    <input type="hidden" name="provider" defaultValue={toUpdate ? provider : user.username} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="providerDid">
                    <CustomLabel value="Provider DID" required />
                    <Form.Control type="text" name="providerDid" defaultValue={toUpdate ? providerDid : user.DID} disabled/>
                    <input type="hidden" name="providerDid" defaultValue={toUpdate ? providerDid : user.DID} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="marketId">
                    <CustomLabel value="Market" tooltip="This is the market name Id, which is uniquely identified a marketplace" required />
                    <Form.Control type="text" name="marketId" defaultValue={marketId ? marketId : market_name} />
                    <input type="hidden" defaultValue={marketId ? marketId : market_name} name="market" />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="marketDid">
                    <CustomLabel value="Market DID" required />
                    <Form.Control type="text" name="marketDid" defaultValue={toUpdate ? marketDid : user.marketDID} disabled/>
                    <input type="hidden" name="marketDid" defaultValue={toUpdate ? marketDid : user.marketDID} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="owner">
                    <CustomLabel value="Owner" tooltip="Owner of the DataOffering" required />
                    <Form.Control type="text" name="owner" defaultValue={owner} required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="ownerDid">
                    <CustomLabel value="Owner DID" required />
                    <Form.Control type="text" name="ownerDid" defaultValue={ownerDid} required />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="ownerConsentForm"><
                    CustomLabel value="Owner Consent Form" tooltip="Hashtag string to report the information about the explicit user consent form documentations" required />
                <Form.Control type="text" name="ownerConsentForm" defaultValue={ownerConsentForm} required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="personalData">
                    <CustomLabel value="Personal Data" tooltip="To define if the data offering offer dataset that contain personal data" required />
                    <Form.Control as="select" value={personal} name={'personalData'} onChange={e => { setPersonal(e.target.value); }} required >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="inSharedNetwork">
                    <CustomLabel value="In Shared Network" tooltip="To define if the DataOffering is shared by Marketplace to be visible and consumable by all actors in the i3-Market Network" required />
                    <Form.Control as="select" value={shared} name={'inSharedNetwork'} onChange={e => { setShared(e.target.value); }} required >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="category">
                    <CustomLabel value="Category" tooltip="A category to have high level classification of domain for the Data Offering" required />
                    <Form.Control as="select" className="mr-3" name="category" defaultValue={category ? capitalize(category) : ''} required >
                        { categoryEl }
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="expirationTime">
                    <CustomLabel value="Expiration Time" tooltip="Expiration Time of dataOffering in case" required />
                    <Form.Control type="date" name="expirationTime"
                        defaultValue={moment(dataOfferingExpirationTime).format('yyyy-MM-DD')} required />
                </Form.Group>
            </Col>
        </Row>
    </>);
}
