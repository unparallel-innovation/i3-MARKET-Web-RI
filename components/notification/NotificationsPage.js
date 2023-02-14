import { useData } from '../../lib/hooks';
import Error from '../layout/Error';
import { Loading } from '../layout/Loading';
import NotificationsList from './NotificationsList';

export default function NotificationsPage(props) {
    const { keyPair } = props;
    const userPublicKeys = keyPair.map(el => el.publicJwk);
    const { data, error } = useData(`/api/notification?userPublicKeys=${JSON.stringify(userPublicKeys)}`);

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    return <NotificationsList {...data} keyPair={keyPair}/>;
}
