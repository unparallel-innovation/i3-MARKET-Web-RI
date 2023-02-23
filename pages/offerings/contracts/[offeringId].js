import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import { Loading } from '../../../components/layout/Loading';
import Error from '../../../components/layout/Error';
import ContractsList from '../../../components/contract/ContractsList';

export default function Contracts() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/contracts?offeringId=${offeringId}&searchType=offering`);
    if (isValidating)
        return <Loading />;

    if (error)
        return <Error error={error} />;

    return <ContractsList {...data}/>;
}
