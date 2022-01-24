import { useData } from '/lib/hooks.js';
import HomePure from '/components/home';
import Error from '../components/layout/Error';

export default function HomePage() {
    const { data, error } = useData('/api/');

    if (error)
        return <Error error={error} />;

    if (!data)
        return <HomePure />;

    return <HomePure { ...data } />;
}
