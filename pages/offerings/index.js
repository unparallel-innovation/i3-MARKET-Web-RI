import {useData} from '/lib/hooks.js';
import Error from '/components/layout/Error.js';
import {Loading} from '/components/layout/Loading';
import useUser from '/lib/user.js';
import Offerings from '/components/offering';

export default function OfferingsPage() {
    const user = useUser();
    const { data, error } = useData(user ? `/api/offerings/${user.providerId}` : '');

    if (!user)
        return null;

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    return <Offerings offerings={data} />;
}
