import { Accordion, Card, Badge, Row } from 'react-bootstrap';
import CustomToggle from '/components/CustomToggle.js';
import KVCol from "./KVCol.js";
import Distribution from './Distribution.js';
import { ts2date } from '/lib/utils.js';

export default
function Dataset(props) {
    const {
        title, description, creator,
        issued, modified,
        language, temporal, temporalResolution,
        accrualPeriodicity, spatial, distribution,
        keywords, category, eventKey
    } = props;

    const keywordsEl = keywords ? keywords.map(item => (
        <Badge key={0} pill variant="primary">{ item }</Badge>
    )) : null;

    const categoryEl = category ? category.map(item => (
        <Badge key={0} pill variant="primary">{ item }</Badge>
    )) : null;

    const distributionEl = distribution.map((dist, idx) => (
        <Distribution key={dist.title}
            eventKey={`${eventKey}-distribution${idx}`} { ...dist } />
    ));

    return (
        <Accordion>
            <Card>
                <CustomToggle eventKey={eventKey}
                    className="bg-primary text-white"
                >
                    <div className="text-tiny text-light">Dataset</div>
                    { title }
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">
                        { description }

                        <Row className="text-center mt-3 bg-lightgray">
                            <KVCol title="Keywords">
                                { keywordsEl }
                            </KVCol>
                            <KVCol title="Category">
                                { categoryEl }
                            </KVCol>
                            <KVCol title="Creator">
                                { creator }
                            </KVCol>
                            <KVCol title="Issued">
                                { ts2date(issued) }
                            </KVCol>
                            <KVCol title="Modified">
                                { ts2date(modified) }
                            </KVCol>
                        </Row>
                        <Row className="text-center mb-3 bg-lightgray">
                            <KVCol title="Language">
                                { language }
                            </KVCol>
                            <KVCol title="Temporal Coverage">
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
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

