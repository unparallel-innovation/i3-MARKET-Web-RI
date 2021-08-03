import { Card } from 'react-bootstrap';

export default
function CategoryCardPure(props) {
    const { name, number = '-' } = props;

    return (
        <Card className="fh">
            <Card.Body className="d-flex align-items-center justify-content-between">
                { name }
                <span className="ml-3 h3 text-primary">{ number }</span>
            </Card.Body>
        </Card>
    );
}
