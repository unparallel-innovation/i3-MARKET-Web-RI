import ReactStars from 'react-rating-stars-component';

export default
function EditableStarRating(props) {
    const { rating, edit, colspan, style, title, onChange } = props;

    return (
        <div className="d-inline-block" style={ style }>
            <div className="row">
                <span className="text-muted mr-3">{ title }</span>
                <span className="ratingMargins" style={{ userSelect:'none' }}>
                    <ReactStars
                        classNames={'align-top'}
                        count = {5}
                        value = {rating}
                        edit = {edit}
                        isHalf = {false}
                        a11y = {false}
                        size = {24}
                        onChange = {onChange}
                    />
                </span>
            </div>
        </div>
    );
}
