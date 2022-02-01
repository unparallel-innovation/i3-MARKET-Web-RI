import DatasetInformation from './DatasetInformation';
import DatasetDistribution from './DatasetDistribution';
import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import DeleteToggle from '../../../common/DeleteToggle';
import { AddNew } from '/components/common/buttons.js';
import { useMap } from '/lib/hooks.js';

export default function Dataset(props) {
    const { eventKey, onDelete } = props;
    const [
        informationMap, informationC,
        informationOnDelete, informationAdd
    ] = useMap(eventKey, 'information');
    const [
        distributionMap, distributionC,
        distributionOnDelete, distributionAdd
    ] = useMap(eventKey, 'distribution');

    const datasetInformationEl = (Object.keys(informationMap)).map((item, idx) => (
        <DatasetInformation key={item} eventKey={item}
            onDelete={informationOnDelete}
        />
    ));

    const datasetDistributionEl = (Object.keys(distributionMap)).map((item, idx) => (
        <DatasetDistribution key={item} eventKey={item}
            onDelete={distributionOnDelete}
        />
    ));

    return (
        <Accordion>
            <Card className="mb-3">
                <DeleteToggle eventKey={eventKey} onDelete={onDelete}
                    className="bg-primary text-white">
                    Dataset
                </DeleteToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Form.Group controlId={eventKey + 'title'}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                placeholder="Title"
                                name={eventKey + 'title'}
                            />
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'keyword'}>
                            <Form.Label>Keyword</Form.Label>
                            <Form.Control type="text"
                                placeholder="Keyword"
                                name={eventKey + 'keyword'}
                            />
                        </Form.Group>

                        <Form.Group controlId={eventKey + 'description'}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                placeholder="Dataset Description"
                                name={eventKey + 'description'}
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'dataset'}>
                                    <Form.Label>Dataset</Form.Label>
                                    <Form.Control
                                        placeholder="Dataset"
                                        name={eventKey + 'dataset'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'issued'}>
                                    <Form.Label>Issued</Form.Label>
                                    <Form.Control type="date"
                                        placeholder="Issued"
                                        name={eventKey + 'issued'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'modified'}>
                                    <Form.Label>Modified</Form.Label>
                                    <Form.Control type="date"
                                        placeholder="Modified"
                                        name={eventKey + 'modified'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'language'}>
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Language"
                                        name={eventKey + 'language'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'temporal'}>
                                    <Form.Label>Temporal</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Temporal"
                                        name={eventKey + 'temporal'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'temporalResolution'}>
                                    <Form.Label>Temporal Resolution</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Temporal Resolution"
                                        name={eventKey + 'temporalResolution'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group controlId={eventKey + 'spatial'}>
                                    <Form.Label>Spatial</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Spatial"
                                        name={eventKey + 'spatial'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={eventKey + 'accrualPeriodicity'}>
                                    <Form.Label>Accrual Periodicity</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Accrual Periodicity"
                                        name={eventKey + 'accrualPeriodicity'}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId={eventKey + 'theme'}>
                            <Form.Label>Theme</Form.Label>
                            <Form.Control type="text"
                                placeholder="Theme"
                                name={eventKey + 'theme'}
                            />
                        </Form.Group>

                        <div className="d-flex align-items-center my-3">
                            <h5 className="flex-grow-1 mb-0">
                                Dataset Information Details
                            </h5>
                            <AddNew onClick={informationAdd} />
                        </div>

                        { datasetInformationEl }

                        <div className="d-flex align-items-center my-3">
                            <h5 className="flex-grow-1 mb-0">
                                Distribution Details
                            </h5>
                            <AddNew onClick={distributionAdd} />
                        </div>

                        { datasetDistributionEl }

                        <input type="hidden" value={informationC}
                            name={eventKey + 'informationC'} />
                        <input type="hidden" value={distributionC}
                            name={eventKey + 'distributionC'} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
