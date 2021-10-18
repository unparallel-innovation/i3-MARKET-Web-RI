import {Col} from 'react-bootstrap';

export default
function KVCol2(props) {
    const { title, children } = props;

    return (
        <Col className="p-2">
            <span className="text-muted mr-3">{ title }</span>
            <span>{ children || 'No information' }</span>
        </Col>
    );
}

