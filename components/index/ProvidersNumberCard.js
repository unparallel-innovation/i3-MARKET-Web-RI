import { useData } from '/lib/hooks.js';
import NumberCard from './NumberCard';

export default
function ProvidersNumberCard(props) {
    const { data, error } = useData('/api/getProvidersN');

    // if (error)
    //   return <ErrorCard error={error} />;

    if (error || !data)
        return <NumberCard className="bg-primary" label="Data Providers" />;

    const { providersN } = data;

    return <NumberCard className="bg-primary" number={providersN} label="Data Providers" />;
}
