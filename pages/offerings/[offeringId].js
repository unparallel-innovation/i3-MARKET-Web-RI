import { useData } from '/lib/hooks.js';
import { Loading } from '/components/layout/Loading.js';
import ErrorC from '/components/layout/ErrorC.js';
import { useRouter } from 'next/router';
import BigText from '../../components/common/BigText';
import Offering from '../../components/offering/details';

export default function OfferingPage() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/offering/${offeringId}`);

    if (error)
        return <ErrorC error={error} />;

    if (isValidating)
        return <Loading />;

    if (!data)
        return <BigText>404 - Offering not found</BigText>;

    return <Offering { ...data } />;
}
