import { Card } from 'react-bootstrap';

export default
function NumberCard(props) {
    const { className, number = "-", label } = props;

    return (
        <Card className={`${className} text-white text-center h-100`}>
            <Card.Body className="d-flex align-items-center justify-content-center">
                <div>
                    <div className="display-4">{ number }</div>
                    <div>{ label }</div>
                </div>
            </Card.Body>
        </Card>
    );
}
