import { useData } from '/lib/hooks.js';
import Error from '/components/layout/Error.js';
import { useRouter } from 'next/router';
import { Loading } from '../../../components/layout/Loading';
import Offering from '../../../components/offering/details';
export default function OfferingPage() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/offering/${offeringId}?localNodeSearch=true`);

    if (isValidating)
        return <Loading />;

    if (error)
        return <Error error={error} />;

    return <Offering { ...data } />;
}
