import {useData} from '/lib/hooks.js';
import ErrorC from '/components/ErrorC.js';
import HomePure from '/components/index';

export default function HomePage() {
    const { data, error } = useData('/api/');

    if (error)
        return <ErrorC error={error} />;

    if (!data)
        return <HomePure />;

    return <HomePure { ...data } />;
}
