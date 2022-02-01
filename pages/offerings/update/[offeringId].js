import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import Error from '../../../components/layout/Error';
import { Loading } from '../../../components/layout/Loading';
import BigText from '../../../components/common/BigText';
import Offering from '../../../components/offering/update';

export default function UpdatePage(props) {
    const router = useRouter();
    const { offeringId } = router.query;

    const { data, error, isValidating } = useData(`/api/offering/update/${offeringId}`);

    if (error)
        return <Error error={error} />;

    if (isValidating)
        return <Loading />;

    if (!data)
        return <BigText>404 - Offering not found</BigText>;

    return <Offering { ...data} />;
}
