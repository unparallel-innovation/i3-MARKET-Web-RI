import { useData } from '/lib/hooks.js';
import Layout from '/components/Layout.js';
import { Loading } from '/components/Loading.js';
import ErrorC from '/components/ErrorC.js';
import Offering from '/components/offerings/offering';;
import { useRouter } from 'next/router';

export default function OfferingPage() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error } = useData(`/api/offering/${offeringId}`);

    if (error)
        return <ErrorC error={error} />;

    if (!data)
        return <Loading />;

    return <Offering { ...data } />;
}
