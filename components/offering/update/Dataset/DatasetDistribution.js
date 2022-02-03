import { Col, Form, Row } from 'react-bootstrap';
import AccessService from './AccessService';

export default function DatasetDistribution(props) {
    const {
        distributionId, title, description, accessRights,
        downloadType, license, conformsTo,
        mediaType, packageFormat, accessService, eventKey
    } = props;

    const accessServiceEl = accessService.map((item, idx) => (
        <AccessService key={item.dataserviceId} eventKey={`${eventKey}accessService${idx}`} { ...item } />
    ));

    return (
        <>
            <Form.Group controlId={eventKey + 'title'}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Distribution Title"
                    name={eventKey + 'title'} defaultValue={title}
                />
            </Form.Group>

            <Form.Group controlId={eventKey + 'description'}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Distribution Description"
                    name={eventKey + 'description'} defaultValue={description}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'accessRights'}>
                        <Form.Label>Access Rights</Form.Label>
                        <Form.Control type="text" placeholder="Access Rights"
                            name={eventKey + 'accessRights'} defaultValue={accessRights}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'downloadType'}>
                        <Form.Label>Download Type</Form.Label>
                        <Form.Control type="text" placeholder="Download Type"
                            name={eventKey + 'downloadType'} defaultValue={downloadType}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'license'}>
                        <Form.Label>License</Form.Label>
                        <Form.Control type="text" placeholder="License"
                            name={eventKey + 'license'} defaultValue={license}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'conformsTo'}>
                        <Form.Label>conformsTo</Form.Label>
                        <Form.Control type="text" placeholder="conformsTo"
                            name={eventKey + 'conformsTo'} defaultValue={conformsTo}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'mediaType'}>
                        <Form.Label>mediaType</Form.Label>
                        <Form.Control type="text" placeholder="mediaType"
                            name={eventKey + 'mediaType'} defaultValue={mediaType}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={eventKey + 'packageFormat'}>
                        <Form.Label>packageFormat</Form.Label>
                        <Form.Control type="text" placeholder="packageFormat"
                            name={eventKey + 'packageFormat'} defaultValue={packageFormat}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <div className="d-flex align-items-center my-4">
                <h5 className="flex-grow-1 mb-0">Access Service</h5>
            </div>

            { accessServiceEl }

            <input type="hidden" name={eventKey + 'distributionId'} defaultValue={distributionId} />
        </>
    );
}
