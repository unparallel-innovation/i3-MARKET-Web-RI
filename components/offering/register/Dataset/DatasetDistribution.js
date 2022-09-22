import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import AccessService from './AccessService';
import { useMap } from '/lib/hooks.js';
import DeleteToggle from '../../../common/DeleteToggle';
import { useState } from 'react';
import CustomLabel from '../../../common/CustomLabel';
import DataExchangeSpec from './DataExchangeSpec';

export default function DatasetDistribution(props) {
    const {
        title, description, accessRights, downloadType, license, conformsTo, mediaType,
        packageFormat, dataStream, accessService, dataExchangeSpec, user, eventKey, onDelete
    } = props;
    const [dtStream, setDtStream] = useState(dataStream);
    const [ accessServiceC ] = useMap(eventKey, 'accessService');
    const [ dataExchangeSpecC ] = useMap(eventKey, 'dataExchangeSpec');

    const accessServiceEl = <AccessService key={'accessServiceKey'} eventKey={eventKey + 'accessService0'} {...accessService} />;
    const dataExchangeSpecEl = <DataExchangeSpec key={'dataExchangeSpecKey'} eventKey={eventKey + 'dataExchangeSpec0'} {...dataExchangeSpec} user={user} />;

    return (
        <Accordion>
            <Card className="mb-3">
                <DeleteToggle eventKey={eventKey}
                    className="bg-secondary text-white" onDelete={onDelete}>
                    Distribution
                </DeleteToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'title'}>
                            <CustomLabel value="Title" tooltip="A name given to the distribution" />
                            <Form.Control type="text" name={eventKey + 'title'} defaultValue={title}/>
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'description'}>
                            <CustomLabel value="Description" tooltip="A free-text account of the distribution" />
                            <Form.Control as="textarea" rows={3} name={eventKey + 'description'} defaultValue={description} />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'accessRights'}>
                                    <CustomLabel value="Access Rights" tooltip="Information about who can access the resource or an indication of its security status" />
                                    <Form.Control type="text" name={eventKey + 'accessRights'} defaultValue={accessRights} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'downloadType'}>
                                    <CustomLabel value="Download Type" tooltip="Information about Download Type [if means like as 'Stream' or 'Bulk' dataset download]" />
                                    <Form.Control type="text" name={eventKey + 'downloadType'} defaultValue={downloadType} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'license'}>
                                    <CustomLabel value="License" tooltip="A legal document under which the distribution is made available" />
                                    <Form.Control type="text" name={eventKey + 'license'} defaultValue={license} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'conformsTo'}>
                                    <CustomLabel value="Conforms To" tooltip="An established standard to which the distribution conforms" />
                                    <Form.Control type="text" name={eventKey + 'conformsTo'} defaultValue={conformsTo} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'mediaType'}>
                                    <CustomLabel value="Media Type" tooltip="The media type of the distribution as defined by IANA [IANA-MEDIA-TYPES]" />
                                    <Form.Control type="text" name={eventKey + 'mediaType'} defaultValue={mediaType} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'packageFormat'}>
                                    <CustomLabel value="Package Format" tooltip="The package format of the distribution in which one or more data files are grouped together, e.g. to enable a set of related files to be downloaded together" />
                                    <Form.Control type="text" name={eventKey + 'packageFormat'} defaultValue={packageFormat} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'dataStream'}>
                                    <CustomLabel value="Data Stream" tooltip="Boolean attribute to check if the dataset is offered as stream or not" />
                                    <Form.Control as="select" value={dtStream} name={eventKey + 'dataStream'}
                                        onChange={e => { setDtStream(e.target.value); }}
                                    >
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col/>
                        </Row>

                        { accessServiceEl }

                        { dataExchangeSpecEl }

                        <input type="hidden" value={accessServiceC} name={eventKey + 'accessServiceC'} />
                        <input type="hidden" value={dataExchangeSpecC} name={eventKey + 'dataExchangeSpecC'} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
