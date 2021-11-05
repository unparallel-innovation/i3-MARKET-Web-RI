import { useContext } from 'react';
import { AccordionContext, Card, useAccordionToggle } from 'react-bootstrap';
import { CaretDownFill, CaretUpFill, PlusCircle, Trash } from 'react-bootstrap-icons';

export default
function PaymentTypeToggle(props) {
    const { className, children, eventKey, callback, onDelete, onAdd } = props;
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
            className={className + ' d-flex align-items-center cursor-pointer'}
            onClick={decoratedOnClick}
        >
            <span className="flex-grow-1">{ children }</span>

            <PlusCircle onClick={(e) => { onAdd(e, eventKey); e.stopPropagation(); }} className="mr-3" />

            <Trash onClick={(e) => { onDelete(e, eventKey); e.stopPropagation(); }} className="mr-3" />

            { caretEl }

        </Card.Header>
    );
}

