import { Col } from 'react-bootstrap';
import { isBoolean } from '../../lib/utils';

export default
function KVCol2(props) {
    const { title, children, colspan } = props;

    const value = isBoolean(children) ? children.toString() : children;

    return (
        <Col className="p-2" md={ colspan }>
            <span className="text-muted mr-3">{ title }</span>
            <span>{ value || 'No information' }</span>
        </Col>
    );
}

