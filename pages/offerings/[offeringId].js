import {useData} from '/lib/hooks.js';
import {Loading} from '/components/Loading.js';
import ErrorC from '/components/ErrorC.js';
import Offering from '/components/offerings/offering';
import {useRouter} from 'next/router';
import BigText from '../../components/BigText';

export default function OfferingPage() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/offering/${offeringId}`);

    if (error)
        return <ErrorC error={error} />;

    if (isValidating)
        return <Loading />;

    if (!data)
        return <BigText>404 - Offering not found</BigText>

    return <Offering { ...data } />;
}
