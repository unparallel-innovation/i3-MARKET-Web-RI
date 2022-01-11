import Layout from '/components/layout/Layout.js';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function Loading() {
    return (<Layout>
        <LoadingSpinner />
    </Layout>);
}
