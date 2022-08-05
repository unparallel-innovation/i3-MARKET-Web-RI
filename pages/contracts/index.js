import { useData } from '../../lib/hooks';
import Error from '../../components/layout/Error';
import { Loading } from '../../components/layout/Loading';
import ContractsPage from '../../components/contract/ContractsPage';

export default function Contracts(props) {
    const { data, error, isValidating } = useData(`/api/contracts?searchType=consumer`);

    if (isValidating)
        return <Loading />;

    if (error)
        return <Error error={error} />;

    return <ContractsPage contracts={data.contracts} user={data.user}/>
}
