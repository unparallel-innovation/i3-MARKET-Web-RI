import { useData } from '../../lib/hooks';
import Error from '../layout/Error';
import { Loading } from '../layout/Loading';
import UserPublicKeys from './UserPublicKeys';

export default function UserDid(props) {
    const { data, error } = useData('/api/user');

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    return <UserPublicKeys {...props} {...data} />;
}
