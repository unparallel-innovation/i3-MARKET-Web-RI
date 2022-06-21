import { Col, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import { capitalize } from '../../../lib/utils';

export default function General(props) {
    const {
        dataOfferingTitle, dataOfferingDescription, marketId, marketDid,
        owner, ownerDid, provider, providerDid, category, dataOfferingExpirationTime,
        categories, user, market_name, toUpdate
    } = props;

    const categoryEl = categories.map(({ name }) => (
        <option key={name} value={name}>{ name }</option>
    ));

    return (<>
        <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Offering Title" name="title" defaultValue={dataOfferingTitle} required />
        </Form.Group>

        <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                placeholder="Offering Description" name="description" defaultValue={dataOfferingDescription} required/>
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId="provider">
                    <Form.Label>Provider</Form.Label>
                    <Form.Control type="text" name="provider" defaultValue={toUpdate ? provider : user.username} disabled/>
                    <input type="hidden" name="provider" defaultValue={toUpdate ? provider : user.username} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="providerDid">
                    <Form.Label>Provider DID</Form.Label>
                    <Form.Control type="text" name="providerDid" defaultValue={toUpdate ? providerDid : user.usernameDID} disabled/>
                    <input type="hidden" name="providerDid" defaultValue={toUpdate ? providerDid : user.usernameDID} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="marketId">
                    <Form.Label>Market</Form.Label>
                    <Form.Control type="text" placeholder="Marketplace" name="marketId" defaultValue={marketId ? marketId : market_name} />
                    <input type="hidden" defaultValue={marketId ? marketId : market_name} name="market" />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="marketDid">
                    <Form.Label>Market DID</Form.Label>
                    <Form.Control type="text" name="marketDid" defaultValue={toUpdate ? marketDid : user.marketDID} disabled/>
                    <input type="hidden" name="marketDid" defaultValue={toUpdate ? marketDid : user.marketDID} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="owner">
                    <Form.Label>Owner</Form.Label>
                    <Form.Control type="text" placeholder="Owner" name="owner" defaultValue={owner} required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="ownerDid">
                    <Form.Label>Owner DID</Form.Label>
                    <Form.Control type="text" placeholder="Owner DID" name="ownerDid" defaultValue={ownerDid} required />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" className="mr-3" name="category" defaultValue={category ? capitalize(category) : ''} >
                        { categoryEl }
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="expirationTime">
                    <Form.Label>Expiration Time</Form.Label>
                    <Form.Control type="date" placeholder="Expiration Time" name="expirationTime"
                        defaultValue={moment(dataOfferingExpirationTime).format('yyyy-MM-DD')} required />
                </Form.Group>
            </Col>
        </Row>
    </>);
}
