import { useRouter } from 'next/router';
import { useData } from '../../../lib/hooks';
import Error from '../../../components/layout/Error';
import { Loading } from '../../../components/layout/Loading';
import BigText from '../../../components/common/BigText';
import Layout from '../../../components/layout/Layout';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import General from '../../../components/offering/register/General';
import { AddNew } from '../../../components/common/buttons';
import Offering from '../../../components/offering/update';

export default function UpdatePage(props) {
    const router = useRouter();
    const { offeringId } = router.query;

    const { data, error, isValidating } = useData(`/api/offering/update/${offeringId}`);

    if (error)
        return <Error error={error} />;

    if (isValidating)
        return <Loading />;

    if (!data)
        return <BigText>404 - Offering not found</BigText>;

    // const { data, error } = useData(`/api/offering/update/${offeringId}`);
    //
    // console.log(data)

    // if (error)
    //     return <Error error={error} />;
    //
    // if (!data)
    //     return <Loading />;
    //
    // console.log(data)

    return <Offering { ...data} />;
}
