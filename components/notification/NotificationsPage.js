import { useData } from '../../lib/hooks';
import Error from '../layout/Error';
import { Loading } from '../layout/Loading';
import NotificationsList from './NotificationsList';

export default function NotificationsPage(props) {
    const { keys } = props;
    const { data, error } = useData(`/api/notification?consumerPublicKeys=${JSON.stringify(keys)}`);

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    return <NotificationsList {...data} />;
}
