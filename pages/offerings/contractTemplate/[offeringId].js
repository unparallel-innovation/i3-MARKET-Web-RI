import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import { Loading } from '../../../components/layout/Loading';
import Error from '../../../components/layout/Error';
import ContractTemplate from '../../../components/offering/buy/ContractTemplate';

export default function ContractTemplatePage() {
    const router = useRouter();
    const { offeringId, paymentType } = router.query;

    let url, paymentTypeObj;
    if (paymentType){
        paymentTypeObj = JSON.parse(router.query.paymentType);
        url = `/api/offering/contractTemplate/${offeringId}?type=${paymentTypeObj.type}&name=${paymentTypeObj.name}&price=${paymentTypeObj.price}&currency=${paymentTypeObj.currency}`;
    }
    else
        url = `/api/offering/contractTemplate/${offeringId}`;

    const { data, error, isValidating } = useData(url);
    if (isValidating)
        return <Loading />;

    if (error)
        return <Error error={error} />;

    return <ContractTemplate {...data} />;
}
