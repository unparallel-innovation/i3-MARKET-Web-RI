import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import Error from '../../../components/layout/Error';
import { Loading } from '../../../components/layout/Loading';
import BigText from '../../../components/common/BigText';
import Register from '../../../components/offering/register';


export default function UpdatePage() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/offering/update/${offeringId}`);

    if (isValidating)
        return <Loading />;

    if (!data)
        return <BigText>Offering {offeringId} not found</BigText>;

    if (error)
        return <Error error={error} />;

    return <Register { ...data } toUpdate/>;
}
