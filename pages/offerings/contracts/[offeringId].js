import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import { Loading } from '../../../components/layout/Loading';
import Error from '../../../components/layout/Error';
import ContractsPage from '../../../components/contract/ContractsPage';

export default function Contracts() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/contracts?id=${offeringId}&searchType=offering`);

    if (isValidating)
        return <Loading />;

    if (error)
        return <Error error={error} />;

    return <ContractsPage contracts={data} />;
}
