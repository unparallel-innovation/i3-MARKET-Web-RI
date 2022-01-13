import { useData } from '/lib/hooks.js';
import { qs } from '/lib/utils.js';
import { fd2qs } from '/lib/forms/registerOffering.js';
import Layout from '/components/layout/Layout.js';
import ErrorC from '/components/layout/ErrorC.js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Row, Spinner } from 'react-bootstrap';
import OfferingCard from '../../components/offering/OfferingCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

function Search(props) {
    const router = useRouter();
    const {
        offerings, providers, categories, searchType,
        category, providerId, isLoading
    } = props;
    const [ _searchType, setSearchType ] = useState(searchType);
    const [ _providerId, setProviderId ] = useState(providerId);
    const [ _category, setCategory ] = useState(category);

    useEffect(() => {
        setSearchType(searchType);
    }, [searchType]);

    useEffect(() => {
        setCategory(category);
    }, [category]);

    useEffect(() => {
        setProviderId(providerId);
    }, [providerId]);

    const selectOneEl = <option key={0}>Select One</option>;

    const providerEl = [selectOneEl].concat(providers.map((item, idx) => (
        <option key={idx + 1} value={item.provider.toLowerCase()}>
            { item.provider }
        </option>
    )));

    const categoriesEl = [selectOneEl].concat(categories.map((item, idx) => (
        <option key={idx + 1} value={item.name.toLowerCase()}>
            { item.name }
        </option>
    )));

    let selectEl = null;

    if (_searchType === 'provider') {
        selectEl = (<Form.Control as="select"
            className="mr-3 dropdown-custom" name="providerId"
            value={_providerId} onChange={e => setProviderId(e.target.value)}>
            { providerEl }
        </Form.Control>);
    }

    if (_searchType === 'category') {
        selectEl = (<Form.Control as="select"
            className="mr-3 dropdown-custom" name="category"
            value={_category} onChange={e => setCategory(e.target.value)}>
            { categoriesEl }
        </Form.Control>);
    }

    const loading = <LoadingSpinner />;

    const searchPlaceholder = (
        <div className="d-flex w-100 flex-grow-1 justify-content-center align-items-center h3 text-lightgray">
            { isLoading ? loading : 'Do a search and see the results here' }
        </div>
    );

    const offeringsEl = offerings.length > 0 ? (<Row>{ offerings.map(offering => (
        <OfferingCard key={offering.dataOfferingId} {...offering} />
    )) }</Row>) : searchPlaceholder;

    return (<Layout className="d-flex flex-column">
        <div className="px-5 flex-grow-1 d-flex flex-column">
            <Form className="d-inline-flex mb-5" onSubmit={onSubmit}>
                <Form.Control as="select" onChange={onChange}
                    className="mr-3 bg-primary text-white dropdown-custom"
                    name="searchType" value={_searchType}
                >
                    <option value="provider">Provider</option>
                    <option value="category">Category</option>
                </Form.Control>
                { selectEl }
                <Button type="submit">Search</Button>
            </Form>

            { offeringsEl }
        </div>
    </Layout>);

    function onChange(e) {
        setSearchType(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);

        if (
            fd.get('providerId') === 'Select One'
            || fd.get('category') === 'Select One'
        )
            return false;

        router.push(`/search?${fd2qs(fd)}`);
    }
}

export default function SearchPage() {
    const router = useRouter();
    const { searchType = 'provider', providerId, category, page, size } = router.query;
    const { data, error } = useData(`/api/search?${qs(router.query)}`);

    if (error)
        return <ErrorC error={error} />;

    if (!data)
        return <Search offerings={[]} providers={[]} categories={[]}
            searchType={searchType} providerId={providerId} isLoading
            category={category ? category.toLowerCase() : category} />;

    return <Search {...data} searchType={searchType}
        category={category ? category.toLowerCase() : category}
        providerId={providerId} />;
}
