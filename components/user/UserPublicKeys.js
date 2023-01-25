import { useEffect, useState } from 'react';
import { walletApi } from '../../lib/walletApi';
import { Loading } from '../layout/Loading';
import ContractsPage from '../contract/ContractsPage';
import NotificationsPage from '../notification/NotificationsPage';

export default function UserPublicKeys(props) {
    const { user, showContracts } = props;
    const [keyPair, setKeyPair] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPublicKeys() {
            const wallet = await walletApi();
            const resources = await wallet.resources.list({ type: 'KeyPair', identity: user.DID });
            const keyPair = resources.map(obj => obj.resource.keyPair);

            setKeyPair(keyPair);
            setLoading(false);
        }
        getPublicKeys();
    }, []);

    if (loading) {
        return <Loading />;
    }

    // with the list of public keys, is possible to retrieve the list of contracts or notifications for a user
    if (showContracts)
        return <ContractsPage keyPair={keyPair}/>;

    return <NotificationsPage keyPair={keyPair}/>;
}
