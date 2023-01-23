import { Col } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

export default
function StarRating(props) {
    const { title, rating, colspan } = props;

    const ratingContainer = (rating && rating > 0) ?
    <span className='ratingMargins'>
        <ReactStars
            classNames={'align-top'}
            count = {5}
            value = {rating}
            isHalf = {true}
            edit = {false}
            a11y = {false}
            size = {32}
        />
    </span> :
    <span>
        No information
    </span>;

    return (

        <Col className="p-2 row" md={ colspan }>
            <div className='col row justify-content-center'>
                <span className="text-muted mr-3">{ title }</span>
                {ratingContainer}
            </div>
        </Col>
    );
}
