import { Accordion, Card, Row, Table } from 'react-bootstrap';
import CustomToggle from '/components/common/CustomToggle.js';
import KVCol from '../../common/KVCol';

export default
function Distribution(props) {
    const {
        title, description, license, accessRights, downloadType,
        conformsTo, mediaType, packageFormat, accessService, eventKey
    } = props;

    return (
        <Accordion>
            <Card>
                <CustomToggle className="bg-white" eventKey={eventKey}>
                    <div className="text-tiny text-muted">Distribution</div>
                    { title }
                </CustomToggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body className="bg-light">
                        { description }

                        <Row className="text-center mt-3 bg-lightgray">
                            <KVCol title="License">
                                { license }
                            </KVCol>
                            <KVCol title="Access Rights">
                                { accessRights }
                            </KVCol>
                            <KVCol title="Download Type">
                                { downloadType }
                            </KVCol>
                        </Row>

                        <Row className="text-center bg-lightgray">
                            <KVCol title="Conforms To">
                                { conformsTo }
                            </KVCol>
                            <KVCol title="Media Type">
                                { mediaType }
                            </KVCol>
                            <KVCol title="Package Format">
                                { packageFormat }
                            </KVCol>
                        </Row>

                        <h5 className="text-center mt-4 text-dark">
                            Access Service
                        </h5>

                        <Table className="mt-3">
                            <thead>
                            <tr>
                                <th>Conforms To</th>
                                <th>Endpoint Description</th>
                                <th>Endpoint URL</th>
                                <th>Serves Dataset</th>
                                <th>Service Specs</th>
                            </tr>
                            </thead>
                            <tbody>
                                <td>{ accessService.conformsTo }</td>
                                <td>{ accessService.endpointDescription }</td>
                                <td>{ accessService.endpointURL }</td>
                                <td>{ accessService.servesDataset }</td>
                                <td>{ accessService.serviceSpecs }</td>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
