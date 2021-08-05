import { useData } from '/lib/hooks.js';
import NumberCard from './NumberCard';

export default
function OfferingsNumberCard(props) {
    const { data, error } = useData('/api/getOfferingsN');

    // if (error)
    //   return <ErrorCard error={error} />;

    if (error || !data)
        return <NumberCard className="bg-secondary" label="Offerings Available" />;

    const { offeringsN } = data;

    return <NumberCard className="bg-secondary" number={offeringsN}
        label="Offerings Available" />;
}
