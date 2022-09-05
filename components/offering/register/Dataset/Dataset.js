import DatasetInformation from './DatasetInformation';
import { Col, Form, Row } from 'react-bootstrap';
import { AddNew } from '/components/common/buttons.js';
import { useMap } from '/lib/hooks.js';
import DatasetDistribution from './DatasetDistribution';
import moment from 'moment';
import { useState } from 'react';
import CustomLabel from '../../../common/CustomLabel';

export default function Dataset(props) {
    const { title, keyword, description, dataset, issued, modified,
        language, temporal, temporalResolution, spatial, accrualPeriodicity,
        theme, datasetInformation, distribution, eventKey
    } = props;

    const [localDatasetInformation,setLocalDatasetInformation] = useState(datasetInformation || []);
    const [localDistribution,setLocalDistribution] = useState(distribution || []);
    const [
        informationMap, informationC,
        informationOnDelete, informationAdd
    ] = useMap(eventKey, 'information', datasetInformation ? datasetInformation.length : 1);

    const [
        distributionMap, distributionC,
        distributionOnDelete, distributionAdd
    ] = useMap(eventKey, 'distribution', distribution ? distribution.length : 1);

    function deleteLocalDatasetInformationEntry(index,a,b) {
        const newLocalDatasetInformation = [...localDatasetInformation];
        newLocalDatasetInformation.splice(index, 1);
        informationOnDelete(a,b);
        setLocalDatasetInformation(newLocalDatasetInformation);
    }

    const datasetInformationEl = (Object.keys(informationMap)).map((item, idx) => (
        <DatasetInformation key={item} eventKey={item} onDelete={(a,b)=>{deleteLocalDatasetInformationEntry(idx,a,b);}} {... localDatasetInformation ? localDatasetInformation[idx] : undefined}/>
    ));

    function deleteLocalDistributionEntry(index,a,b) {
        const newLocalDistribution = [...localDistribution];
        newLocalDistribution.splice(index, 1);
        distributionOnDelete(a,b);
        setLocalDistribution(newLocalDistribution);
    }

    const datasetDistributionEl = (Object.keys(distributionMap)).map((item, idx) => (
        <DatasetDistribution key={item} eventKey={item} onDelete={(a,b)=>{deleteLocalDistributionEntry(idx,a,b);}} {...localDistribution ? localDistribution[idx] : undefined} />
    ));

    return (<>
        <Form.Group controlId={eventKey + 'title'}>
            <CustomLabel value="Title" tooltip="A name given to the dataset" required />
            <Form.Control type="text" name={eventKey + 'title'} defaultValue={title} required />
        </Form.Group>

        <Form.Group controlId={eventKey + 'keyword'}>
            <CustomLabel value="Keyword" tooltip="A keyword or tag describing the resource" required />
            <Form.Control type="text" name={eventKey + 'keyword'} defaultValue={keyword} required />
        </Form.Group>

        <Form.Group controlId={eventKey + 'description'}>
            <CustomLabel value="Description" tooltip="A free-text account of the dataset" required />
            <Form.Control as="textarea" rows={3} name={eventKey + 'description'} defaultValue={description} required />
        </Form.Group>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'issued'}>
                    <CustomLabel value="Issued" tooltip="Date of formal issuance [e.g., publication] of the distribution." required />
                    <Form.Control type="date" name={eventKey + 'issued'} defaultValue={moment(issued).format('yyyy-MM-DD')} required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'modified'}>
                    <CustomLabel value="Modified" tooltip="Most recent date on which the item was changed, updated or modified" required />
                    <Form.Control type="date" name={eventKey + 'modified'} defaultValue={moment(modified).format('yyyy-MM-DD')} required />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'temporal'}>
                    <CustomLabel value="Temporal" tooltip="The temporal period that the dataset covers" required />
                    <Form.Control type="text" name={eventKey + 'temporal'} defaultValue={temporal} required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'temporalResolution'}>
                    <CustomLabel value="Temporal Resolution" tooltip="Minimum time period resolvable in the dataset" required />
                    <Form.Control type="text" name={eventKey + 'temporalResolution'} defaultValue={temporalResolution}  />
                    {/*TODO error when update*/}
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col>
                <Form.Group controlId={eventKey + 'spatial'}>
                    <CustomLabel value="Spatial" tooltip="The geographical area covered by the dataset" required />
                    <Form.Control type="text" name={eventKey + 'spatial'} defaultValue={spatial} required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={eventKey + 'accrualPeriodicity'}>
                    <CustomLabel value="Accrual Periodicity" tooltip="The frequency at which dataset is published" required />
                    <Form.Control type="text" name={eventKey + 'accrualPeriodicity'} defaultValue={accrualPeriodicity} />
                </Form.Group>
            </Col>
        </Row>

        <Form.Group controlId={eventKey + 'theme'}>
            <Row>
                <Col>
                    <Form.Group controlId={eventKey + 'language'}>
                        <CustomLabel value="Language" tooltip="A language of the item. This refers to the natural language used for textual metadata [i.e. titles, descriptions, etc] of a cataloged resource [i.e. dataset or service] or the textual values of a dataset distribution" required />
                        <Form.Control type="text" name={eventKey + 'language'} defaultValue={language} required />
                    </Form.Group>
                </Col>
                <Col>
                    <CustomLabel value="Theme" tooltip="A [sub-]category of the resource. A resource can have multiple themes" required />
                    <Form.Control type="text" name={eventKey + 'theme'} defaultValue={theme} required />
                </Col>
            </Row>

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

        <input type="hidden" value={informationC} name={eventKey + 'informationC'} />
        <input type="hidden" value={distributionC} name={eventKey + 'distributionC'} />

    </>);
}
