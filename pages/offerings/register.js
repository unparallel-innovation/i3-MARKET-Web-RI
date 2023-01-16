import { useData } from '/lib/hooks.js';
import Error from '/components/layout/Error.js';
import { Loading } from '/components/layout/Loading';
import Register from '/components/offering/register';

export default function RegisterPage({ edit = false }) {
    const { data, error } = useData('/api/offering/register');

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    return <Register { ...data } />;
}
