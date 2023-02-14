import { useData } from '/lib/hooks.js';
import Error from '/components/layout/Error.js';
import { Loading } from '/components/layout/Loading';
import Offerings from '/components/offering';

export default function OfferingsPage() {
    const { data, error } = useData('/api/offering/provider');

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    return <Offerings offerings={data} />;
}
