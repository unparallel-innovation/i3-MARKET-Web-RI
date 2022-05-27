import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import { Loading } from '../../../components/layout/Loading';
import ContractTemplate from '../../../components/offering/buy/contractTemplate';
import Error from '../../../components/layout/Error';
import BigText from '../../../components/common/BigText';

export default function BuyPage (){
    const router = useRouter();
    const { offeringId } = router.query;
    const { data, error, isValidating } = useData(`/api/offering/buy/${offeringId}`);

    console.log(data, isValidating, error)

    if (isValidating)
        return <Loading />;
    //
    // if (!data)
    //     return <BigText>Offering {offeringId} not found</BigText>;

    if (error)
        return <Error error={error} />;

    return <ContractTemplate {...data}/>

}
