import { useRouter } from 'next/router';
import { useData } from '../../lib/hooks';
import BigText from '../../components/common/BigText';
import Error from '../../components/layout/Error';

export default function ContractPage(){
    const router = useRouter();
    const { agreementId } = router.query;
    const { data, error } = useData(`/api/contracts/${agreementId}`);

    if (!data)
        return <BigText>Agreement {agreementId} not found</BigText>;

    if (error)
        return <Error error={error} />;

    return <ContractPage {...data} disableInput />
}
