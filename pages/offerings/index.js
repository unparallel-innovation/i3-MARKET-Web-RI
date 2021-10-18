import {useData} from '/lib/hooks.js';
import ErrorC from '/components/ErrorC.js';
import {Loading} from '/components/Loading';
import useUser from '/lib/user.js';
import Offerings from '/components/offerings/index';

export default function OfferingsPage() {
    const user = useUser();
    const { data, error } = useData(user ? `/api/offerings/${user.providerId}` : '');

    if (!user)
        return null;

    if (error)
        return <ErrorC error={error} />;

    if (!data)
        return <Loading />;

    return <Offerings offerings={data} />;
}
