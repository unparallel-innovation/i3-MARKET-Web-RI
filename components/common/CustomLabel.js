import { Form } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';

export default function CustomLabel(props) {
    const { value, required, tooltip } = props;

    return (
        <div className="d-flex">
            {required ? <span className="mr-1" style={{ color: 'red' }}> * </span> : null}
            <Form.Label>{value}</Form.Label>
            {tooltip ? <span title={tooltip}>
                <InfoCircle size={14} className="ml-1 mb-1" />
            </span> : null}
        </div>
    );
}
