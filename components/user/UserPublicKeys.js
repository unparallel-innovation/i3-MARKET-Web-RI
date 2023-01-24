import { useEffect, useState } from 'react';
import { walletApi } from '../../lib/walletApi';
import { Loading } from '../layout/Loading';
import ContractsPage from '../contract/ContractsPage';

export default function UserPublicKeys(props) {
    const { user, showContracts } = props;
    const [keys, setPublicKeys] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPublicKeys() {
            const wallet = await walletApi();
            const resources = await wallet.resources.list({ type: 'KeyPair', identity: user.DID });
            const publicKeys = resources.map(obj => obj.resource.keyPair.publicJwk);

            setPublicKeys(publicKeys);
            setLoading(false);
        }
        getPublicKeys();
    }, []);

    if (loading) {
        return <Loading />;
    }
    if (showContracts)
        return <ContractsPage keys={keys}/>;

    return <div>notifications page</div>;
}
