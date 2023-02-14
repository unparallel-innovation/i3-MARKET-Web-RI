import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import { Loading } from '../../../components/layout/Loading';
import BigText from '../../../components/common/BigText';
import Error from '../../../components/layout/Error';
import ContractTemplate from '../../../components/contract/ContractTemplate';

export default function ContractTemplatePage() {
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/offering/contractTemplate/${offeringId}`);

    if (isValidating)
        return <Loading />;

    if (error)
        return <Error error={error} />;

    if (!data)
        return <BigText>Contract template for offering {offeringId} not found</BigText>;

    return <ContractTemplate {...data} />;
}
