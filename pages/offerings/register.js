import { useData } from '/lib/hooks.js';
import ErrorC from '/components/ErrorC.js';
import { Loading } from '/components/Loading';
import Register from '/components/offerings/register';

export default function RegisterPage() {
    const { data, error } = useData('/api/offerings/register');

    if (error)
        return <ErrorC error={error} />;

    if (!data)
        return <Loading />;

    return <Register { ...data } />;
}
