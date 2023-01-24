import { useState } from 'react';
import BigText from '../common/BigText';
import ContractCard from './ContractCard';
import Layout from '../layout/Layout';
import { useData } from '../../lib/hooks';
import Error from '../layout/Error';
import { Loading } from '../layout/Loading';
import UserPublicKeys from '../user/UserPublicKeys';
import ContractsList from './ContractsList';

export default function ContractsPage(props) {
    const { keys } = props;
    const { data, error } = useData(`/api/contracts?searchType=consumer&consumerPublicKeys=${JSON.stringify(keys)}`);

    if (error)
        return <Error error={error} />;

    if (!data)
        return <Loading />;

    return <ContractsList {...data} />;
}
