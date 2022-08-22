import { Accordion, Badge, Card, Row } from 'react-bootstrap';
import CustomToggle from '/components/common/CustomToggle.js';
import KVCol from '../../common/KVCol.js';
import Distribution from './Distribution.js';
import DatasetInformation from './DatasetInformation';
import { ts2date } from '../../../lib/utils';

export default
function Dataset(props) {
    const {
        title, description, dataset, issued, modified,
        language, temporal, temporalResolution,
        accrualPeriodicity, spatial, distribution,
        keyword, datasetInformation, eventKey
    } = props;

    const distributionEl = distribution.map((dist, idx) => (
        <Distribution key={`distribution${idx}`}
            eventKey={`${eventKey}-distribution${idx}`} { ...dist } />
    ));

    const datasetInformationEl = datasetInformation.map((inf, idx) => (
        <DatasetInformation key={`datasetInformation${idx}`}
            eventKey={`${eventKey}-datasetInformation${idx}`} { ...inf } />
    ));

    return (
        <Accordion>
            <Card>
                <CustomToggle eventKey={eventKey}
                    className="bg-primary text-white"
                >
                    <div className="text-tiny text-light">Dataset: { title }</div>
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">
                        { description }

                        <Row className="text-center mt-3 bg-lightgray">
                            <KVCol title="Keywords">
                                { keyword }
                            </KVCol>
                            <KVCol title="Dataset">
                                { dataset }
                            </KVCol>
                            <KVCol title="Issued">
                                { ts2date(issued) }
                            </KVCol>
                            <KVCol title="Modified">
                                { ts2date(modified) }
                            </KVCol>
                            <KVCol title="Language">
                                { language }
                            </KVCol>
                        </Row>
                        <Row className="text-center mb-3 bg-lightgray">

                            <KVCol title="Temporal">
                                { temporal }
                            </KVCol>
                            <KVCol title="Temporal Resolution">
                                { temporalResolution }
                            </KVCol>
                            <KVCol title="Accrual Periodicity">
                                { accrualPeriodicity }
                            </KVCol>
                            <KVCol title="Spatial">
                                { spatial }
                            </KVCol>
                        </Row>

                        { distributionEl }

                        <div className="mt-2" />

                        { datasetInformationEl }

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

