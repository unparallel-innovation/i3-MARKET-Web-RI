import { useContext } from 'react';
import { Card, useAccordionToggle, AccordionContext } from 'react-bootstrap';
import { CaretDownFill, CaretUpFill, Trash } from 'react-bootstrap-icons';

export default
function DeleteToggle(props) {
    const { className, children, eventKey, callback, onDelete } = props;
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    const caretEl = isCurrentEventKey
        ? <CaretUpFill />
        : <CaretDownFill />;

    return (
        <Card.Header
            className={className + " d-flex align-items-center cursor-pointer"}
            onClick={decoratedOnClick}
        >
            <span className="flex-grow-1">{ children }</span>

            <Trash onClick={(e) => { onDelete(e, eventKey); e.stopPropagation(); }} className="mr-3" />

            { caretEl }

        </Card.Header>
    );
}

