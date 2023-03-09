import ReactStars from 'react-rating-stars-component';

export default
function StarRating(props) {
    const { title, rating, colspan, style } = props;

    const ratingContainer = (rating && rating > 0)
        ? <span className="ratingMargins" style={{ userSelect:'none' }}>
            <ReactStars
                classNames={'align-top'}
                count = {5}
                value = {rating}
                isHalf = {true}
                edit = {false}
                a11y = {false}
                size = {24}
            />
        </span>
        : <span>
            Not rated
        </span>;

    return (
        <div className="d-inline-block" style={ style }>
            <div className="row">
                <span className="text-muted mr-3">{ title }</span>
                {ratingContainer}
            </div>
        </div>
    );
}
