import { Card } from 'react-bootstrap';
import { useData } from '/lib/hooks.js';

function CategoryInfoCard(props) {
    const { name, number = '-' } = props;

    return (
        <Card className="h-100">
            <Card.Body className="d-flex align-items-center justify-content-between">
                { name }
                <span className="ml-3 h3 text-primary">{ number }</span>
            </Card.Body>
        </Card>
    );
}

export default
function CategoryCard(props) {
    const { category } = props;
    const { data, error } = useData(`/api/getCategoryOfferingsN?category=${category.name}`);

    // if (error)
    //   return <ErrorCard error={error} />;

    if (error || !data)
        return <CategoryInfoCard name={category.name} />;

    const { offeringsN } = data;

    return <CategoryInfoCard name={category.name} number={offeringsN} />;
}
