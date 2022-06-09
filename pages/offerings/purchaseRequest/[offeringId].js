import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import { Loading } from '../../../components/layout/Loading';
import PurchaseRequest from '../../../components/offering/buy/PurchaseRequest';
import Error from '../../../components/layout/Error';
import BigText from '../../../components/common/BigText';

export default function PurchaseRequestPage (){
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/offering/purchaseRequest/${offeringId}`);

    if (isValidating)
        return <Loading />;

    if (!data)
        return <BigText>Contract template for offering {offeringId} not found</BigText>;

    if (error)
        return <Error error={error} />;

    return <PurchaseRequest {...data}/>

}
