import { Col, Form, Row } from 'react-bootstrap';
import DatasetInformation from './DatasetInformation';
import DatasetDistribution from './DatasetDistribution';

export default function Dataset(props) {
    const {
        title, description, issued, modified,
        dataset, theme, language, temporal,
        temporalResolution, accrualPeriodicity,
        spatial, distribution, keywords, datasetInformation,
        eventKey
    } = props;

    const datasetInformationEl = datasetInformation.map((item, idx) => (
        <DatasetInformation key={item.datasetInformationId} eventKey={`datasetInformation${idx}`} { ...item } />
    ));

    const distributionEl = distribution.map((item, idx) => (
        <DatasetDistribution key={item.distributionId} eventKey={`distribution${idx}`} { ...item } />
    ));

    return (<>
        <Form.Group controlId={eventKey + 'title'}>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title"
                name={eventKey + 'title'} defaultValue={title}
            />
        </Form.Group>

        <Form.Group controlId={eventKey + 'keyword'}>
            <Form.Label>Keyword</Form.Label>
            <Form.Control type="text" placeholder="Keyword"
                name={eventKey + 'keyword'} defaultValue={keywords}
            />
        </Form.Group>

        <Form.Group controlId={eventKey + 'description'}>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Dataset Description"
                name={eventKey + 'description'} defaultValue={description}
            />
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'dataset'}>
                    <Form.Label>Dataset</Form.Label>
                    <Form.Control
                        type="text" placeholder="Dataset"
                        name={eventKey + 'dataset'} defaultValue={dataset}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'issued'}>
                    <Form.Label>Issued</Form.Label>
                    <Form.Control type="date" placeholder="Issued"
                        name={eventKey + 'issued'} defaultValue={issued.substring(0, 10)}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'modified'}>
                    <Form.Label>Modified</Form.Label>
                    <Form.Control type="date" placeholder="Modified"
                        name={eventKey + 'modified'} defaultValue={modified.substring(0, 10)}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'language'}>
                    <Form.Label>Language</Form.Label>
                    <Form.Control type="text" placeholder="Language"
                        name={eventKey + 'language'} defaultValue={language}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'temporal'}>
                    <Form.Label>Temporal</Form.Label>
                    <Form.Control type="text" placeholder="Temporal"
                        name={eventKey + 'temporal'} defaultValue={temporal}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'temporalResolution'}>
                    <Form.Label>Temporal Resolution</Form.Label>
                    <Form.Control type="text" placeholder="Temporal Resolution"
                        name={eventKey + 'temporalResolution'} defaultValue={temporalResolution}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'spatial'}>
                    <Form.Label>Spatial</Form.Label>
                    <Form.Control type="text" placeholder="Spatial"
                        name={eventKey + 'spatial'} defaultValue={spatial}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'accrualPeriodicity'}>
                    <Form.Label>Accrual Periodicity</Form.Label>
                    <Form.Control type="text" placeholder="Accrual Periodicity"
                        name={eventKey + 'accrualPeriodicity'} defaultValue={accrualPeriodicity}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Form.Group controlId={eventKey + 'theme'}>
            <Form.Label>Theme</Form.Label>
            <Form.Control type="text" placeholder="Theme"
                name={eventKey + 'theme'} defaultValue={theme}
            />
        </Form.Group>

        <div className="d-flex align-items-center my-4">
            <h5 className="flex-grow-1 mb-0">Dataset Information</h5>
        </div>

        { datasetInformationEl }

        <div className="d-flex align-items-center my-4">
            <h5 className="flex-grow-1 mb-0">Dataset Distribution</h5>
        </div>

        { distributionEl }
    </>);
}
