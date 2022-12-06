import { Accordion, Card, Row } from 'react-bootstrap';
import CustomToggle from '../../common/CustomToggle';
import KVCol from '../../common/KVCol';

export default function HasIntendedUse(props) {
    const { processData, shareDataWithThirdParty, editData, eventKey } = props;

    return (
        <Accordion>
            <Card>
                <CustomToggle className="bg-white" eventKey={eventKey}>
                    <div className="text-tiny text-muted">Has Intended Use</div>
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">

                        <Row className="text-center mt-3 bg-lightgray">
                            <KVCol title="Process Data">
                                { processData.toString() }
                            </KVCol>
                            <KVCol title="Share Data With Third Party">
                                { shareDataWithThirdParty.toString() }
                            </KVCol>
                            <KVCol title="Edit Data">
                                { editData.toString() }
                            </KVCol>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
