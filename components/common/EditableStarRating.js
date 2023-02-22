import { Col } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

export default
function EditableStarRating(props) {
    const { rating, edit, colspan, style, title, onChange } = props;

    return (
        <Col className="p-2 row" md={ colspan } style={ style }>
            <div className="row col justify-content-center">
                <span className="text-muted mr-3">{ title }</span>
                <span className="ratingMargins" style={{ userSelect:'none' }}>
                    <ReactStars
                        classNames={'align-top'}
                        count = {5}
                        value = {rating}
                        edit = {edit}
                        isHalf = {false}
                        a11y = {false}
                        size = {32}
                        onChange = {onChange}
                    />
                </span>
            </div>
        </Col>
    );
}
