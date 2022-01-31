import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import DeleteToggle from '../../common/DeleteToggle';
import { ts2date } from '../../../lib/utils';

export default function Dataset(props) {
    const {
        title, description, creator,
        issued, modified, dataset,
        language, temporal, temporalResolution,
        accrualPeriodicity, spatial, distribution,
        keywords, category, datasetInformation, eventKey
    } = props;

    console.log(props);
    return (<>
        <Form.Group controlId={eventKey + 'title'}>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"
                placeholder="Title"
                name={eventKey + 'title'}
                value={title}
            />
        </Form.Group>

        <Form.Group controlId={eventKey + 'keyword'}>
            <Form.Label>Keyword</Form.Label>
            <Form.Control type="text"
                placeholder="Keyword"
                name={eventKey + 'keyword'}
                value={keywords}
            />
        </Form.Group>

        <Form.Group controlId={eventKey + 'description'}>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                placeholder="Dataset Description"
                name={eventKey + 'description'}
                value={description}
            />
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'dataset'}>
                    <Form.Label>Dataset</Form.Label>
                    <Form.Control
                        placeholder="Dataset"
                        name={eventKey + 'dataset'}
                        value={dataset}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'issued'}>
                    <Form.Label>Issued</Form.Label>
                    <Form.Control type="date"
                        placeholder="Issued"
                        name={eventKey + 'issued'}
                        value={issued.substring(0, 10)}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'modified'}>
                    <Form.Label>Modified</Form.Label>
                    <Form.Control type="date"
                        placeholder="Modified"
                        name={eventKey + 'modified'}
                        value={modified.substring(0, 10)}
                    />
                </Form.Group>
            </Col>
        </Row>
    </>);
}
