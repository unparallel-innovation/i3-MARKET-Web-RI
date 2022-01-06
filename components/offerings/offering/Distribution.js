import { Accordion, Card, Row, Table } from 'react-bootstrap';
import CustomToggle from '/components/CustomToggle.js';
import KVCol from '../../KVCol';

export default
function Distribution(props) {
    const {
        title, description,
        license, accessRights, downloadType,
        conformsTo, mediaType, packageFormat,
        accessService, eventKey
    } = props;

    const accessServiceEl = accessService.map(({
        conformsTo, endpointDescription, endpointURL,
        servesDataset, serviceSpecs
    }, idx) => (
        <tr key={idx}>
            <td>{ conformsTo }</td>
            <td>{ endpointDescription }</td>
            <td>{ endpointURL }</td>
            <td>{ servesDataset }</td>
            <td>{ serviceSpecs }</td>
        </tr>
    ));

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
                                { accessServiceEl }
                            </tbody>
                        </Table>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
