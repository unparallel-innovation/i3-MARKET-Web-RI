import DatasetInformation from './DatasetInformation';
import { Col, Form, Row } from 'react-bootstrap';
import { AddNew } from '/components/common/buttons.js';
import { useMap } from '/lib/hooks.js';
import DatasetDistribution from './DatasetDistribution';
import moment from 'moment';

export default function Dataset(props) {
    const { hasDataset, eventKey } = props;

    const { title, keyword, description, dataset,
        issued, modified, language, temporal, temporalResolution,
        spatial, accrualPeriodicity, theme, datasetInformation
    } = hasDataset

    const [
        informationMap, informationC,
        informationOnDelete, informationAdd
    ] = useMap(eventKey, 'information');
    const [
        distributionMap, distributionC,
        distributionOnDelete, distributionAdd
    ] = useMap(eventKey, 'distribution');

    // const datasetInformationEl = (Object.keys(informationMap)).map((item, idx) => (
    //     <DatasetInformation key={item} eventKey={item} onDelete={informationOnDelete} />
    // ));

    // const datasetInformationEl = datasetInformation.map((item, idx) => (
    //     <DatasetInformation key={`datasetInformation${idx}`} eventKey={`${eventKey}datasetInformation${idx}`} { ...item } onDelete={informationOnDelete}/>
    // ));

    // const datasetInformationEl = dataset.datasetInformation.map((item, idx) => (
    //     <DatasetInformation key={`datasetInformation${idx}`} eventKey={`${eventKey}datasetInformation${idx}`} { ...item } />
    // ));
    //
    // const datasetDistributionEl = (Object.keys(distributionMap)).map((item, idx) => (
    //     <DatasetDistribution key={item} eventKey={item} onDelete={distributionOnDelete} />
    // ));

    return (<>
        <Form.Group controlId={eventKey + 'title'}>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" name={eventKey + 'title'} defaultValue={title} />
        </Form.Group>

        <Form.Group controlId={eventKey + 'keyword'}>
            <Form.Label>Keyword</Form.Label>
            <Form.Control type="text" placeholder="Keyword" name={eventKey + 'keyword'} value={keyword}/>
        </Form.Group>

        <Form.Group controlId={eventKey + 'description'}>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}
                placeholder="Dataset Description" name={eventKey + 'description'} value={description}
            />
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'dataset'}>
                    <Form.Label>Dataset</Form.Label>
                    <Form.Control placeholder="Dataset" name={eventKey + 'dataset'} value={dataset}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'issued'}>
                    <Form.Label>Issued</Form.Label>
                    <Form.Control type="date" placeholder="Issued" name={eventKey + 'issued'} value={moment(issued).format('yyyy-MM-DD')}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'modified'}>
                    <Form.Label>Modified</Form.Label>
                    <Form.Control type="date" placeholder="Modified" name={eventKey + 'modified'} value={moment(modified).format('yyyy-MM-DD')} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'language'}>
                    <Form.Label>Language</Form.Label>
                    <Form.Control type="text" placeholder="Language" name={eventKey + 'language'} value={language} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'temporal'}>
                    <Form.Label>Temporal</Form.Label>
                    <Form.Control type="text" placeholder="Temporal" name={eventKey + 'temporal'} value={temporal} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'temporalResolution'}>
                    <Form.Label>Temporal Resolution</Form.Label>
                    <Form.Control type="text" placeholder="Temporal Resolution"
                                  name={eventKey + 'temporalResolution'} value={temporalResolution} />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'spatial'}>
                    <Form.Label>Spatial</Form.Label>
                    <Form.Control type="text" placeholder="Spatial" name={eventKey + 'spatial'} value={spatial}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'accrualPeriodicity'}>
                    <Form.Label>Accrual Periodicity</Form.Label>
                    <Form.Control type="text" placeholder="Accrual Periodicity"
                                  name={eventKey + 'accrualPeriodicity'} value={accrualPeriodicity}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Form.Group controlId={eventKey + 'theme'}>
            <Form.Label>Theme</Form.Label>
            <Form.Control type="text" placeholder="Theme" name={eventKey + 'theme'} value={theme}/>
        </Form.Group>

        {/*<div className="d-flex align-items-center my-3">*/}
        {/*    <h5 className="flex-grow-1 mb-0">*/}
        {/*        Dataset Information Details*/}
        {/*    </h5>*/}
        {/*    <AddNew onClick={informationAdd} />*/}
        {/*</div>*/}

        {/*{ datasetInformationEl }*/}

        {/*<div className="d-flex align-items-center my-3">*/}
        {/*    <h5 className="flex-grow-1 mb-0">*/}
        {/*        Distribution Details*/}
        {/*    </h5>*/}
        {/*    <AddNew onClick={distributionAdd} />*/}
        {/*</div>*/}

        {/*{ datasetDistributionEl }*/}

        <input type="hidden" value={informationC} name={eventKey + 'informationC'} />
        <input type="hidden" value={distributionC} name={eventKey + 'distributionC'} />

    </>);
}
