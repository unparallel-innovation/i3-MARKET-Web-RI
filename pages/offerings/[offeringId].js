import { useData } from '/lib/hooks.js';
import Error from '/components/layout/Error.js';
import { useRouter } from 'next/router';
import BigText from '../../components/common/BigText';
import Offering from '../../components/offering/details';
import {Loading} from '../../components/layout/Loading';

export default function OfferingPage() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/offering/${offeringId}`);

    if (error)
        return <Error error={error} />;

    if (isValidating)
        return <Loading />;

    if (!data)
        return <BigText>404 - Offering not found</BigText>;

    return <Offering { ...data } />;
}
