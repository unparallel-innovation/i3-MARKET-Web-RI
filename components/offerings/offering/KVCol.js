import { Col } from 'react-bootstrap';

export default
function KVCol(props) {
    const { title, children } = props;

    return (
        <Col className="p-2">
            <div className="text-darkblue">
                { title }
            </div>
            <div>
                { children || "No information" }
            </div>
        </Col>
    );
}
