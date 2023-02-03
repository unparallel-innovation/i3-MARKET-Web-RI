import { useData } from '../../lib/hooks';
import Error from '../layout/Error';
import { Loading } from '../layout/Loading';
import ContractsList from './ContractsList';

export default function UserContracts(props) {
    const { keyPair } = props;
    const publicKeys = keyPair.map(k=>k.publicJwk);
    const { data, error } = useData(`/api/contracts?searchType=consumer&consumerPublicKeys=${JSON.stringify(publicKeys)}`);

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    return <ContractsList {...data} />;
}
