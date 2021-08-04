import { useData } from '/lib/hooks.js'
import Layout from '/components/Layout.js'
import ErrorC from '/components/ErrorC.js'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import {Form, Button, Row} from 'react-bootstrap'
import OfferingCard from "../../components/offerings/OfferingCard";

function Search(props){
  const router = useRouter()
  const {
    offerings, providers, categories, searchType,
    category, providerId, isLoading
  } = props;
  const [ _searchType, setSearchType ] = useState(searchType);
  const [ _providerId, setProviderId ] = useState(providerId);
  const [ _category, setCategory ] = useState(category);

  useEffect(() => {
    setSearchType(searchType)
  }, [searchType])

  useEffect(() => {
    setCategory(category)
  }, [category])

  useEffect(() => {
    setProviderId(providerId)
  }, [providerId])

  const selectOneEl = <option key={0} >Select One</option>

  const providerEl = [selectOneEl].concat(providers.map((item, idx) => (
      <option key={idx+1} value={item.providerId.toLowerCase()}>{item.providerId}</option>
  )));

  const categoriesEl = [selectOneEl].concat(categories.map((item, idx) => (
      <option key={idx+1} value={item.name.toLowerCase()}>{item.name}</option>
  )));

  let selectEl = null;

  if (_searchType === "provider") {
    selectEl = (<Form.Control as="select" className="mr-3 dropdown-custom" name="providerId"
      value={_providerId} onChange={e => setProviderId(e.target.value)}>
      { providerEl}
    </Form.Control>);
  }

  if (_searchType === "category") {
    selectEl = (<Form.Control as="select" className="mr-3 dropdown-custom" name="category"
      value={_category} onChange={e => setCategory(e.target.value)}>
      { categoriesEl }
    </Form.Control>);
  }

  const searchPlaceholder = (<div className="d-flex w-100 flex-grow-1 justify-content-center align-items-center h3 text-lightgray">
    {isLoading?"Loading results.. Please wait..":"Do a search and see the results here"}
  </div>)

  const offeringsEl = offerings.length > 0 ? (<Row>{ offerings.map(offering => (
      <OfferingCard key={offering.dataOfferingId} {...offering} />
  )) }</Row>) : searchPlaceholder

  return (<>
    <Form className="d-inline-flex mb-5" onSubmit={onSubmit}>
      <Form.Control as="select" onChange={onChange} className="mr-3 bg-primary text-white dropdown-custom"
                    name="searchType" value={_searchType}
      >
        <option value="provider">Provider</option>
        <option value="category">Category</option>
      </Form.Control>
      { selectEl }
      <Button type="submit">Search</Button>
    </Form>

    { offeringsEl }
  </>);

  function onChange(e) {
    setSearchType(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const fde = [...fd.entries()];
    const params = fde
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');
    router.push(`/search?${params}`);
  }
}

export default function SearchPage() {
  const router = useRouter();
  const { searchType = "provider", providerId, category } = router.query;
  const { data, error } = useData(
      `/api/search?searchType=${searchType}&providerId=${providerId}&category=${category}`
  );

  if (error)
    return <ErrorC error={error} />;

  if (!data)
    return (<Layout className="d-flex flex-column">
      <div className="px-5 flex-grow-1 d-flex flex-column">
        <Search offerings={[]} providers={[]} categories={[]}
          searchType={searchType} category={category ? category.toLowerCase(): category} providerId={providerId}
          isLoading />
      </div>
    </Layout>)

  return (<Layout className="d-flex flex-column">
    <div className="px-5 flex-grow-1 d-flex flex-column">
      <Search { ...data } searchType={searchType}
        category={category ? category.toLowerCase(): category}
        providerId={providerId} />
    </div>
  </Layout>)
}
