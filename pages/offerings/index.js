import { useData } from '/lib/hooks.js';
import Layout from '/components/Layout.js';
import ErrorC from '/components/ErrorC.js';
import { Loading } from '/components/Loading';
import user from '/lib/user.js';
import Offerings from '/components/offerings/index';

export default function OfferingsPage() {
    const { data, error } = useData(`/api/offerings/${user.providerId}`);

    if (error)
        return <ErrorC error={error} />;

    if (!data)
        return <Loading />;

    return <Offerings offerings={data} />;
}
