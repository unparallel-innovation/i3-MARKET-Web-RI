import { useData } from '/lib/hooks.js';
import HomePure from '/components/home';
import ErrorC from '../components/layout/ErrorC';

export default function HomePage() {
    const { data, error } = useData('/api/');

    if (error)
        return <ErrorC error={error} />;

    if (!data)
        return <HomePure />;

    return <HomePure { ...data } />;
}
