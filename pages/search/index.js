import { useData } from '/lib/effects.js'
import { Layout, ErrorC } from '/components/common.js'
import { useState } from 'react'
import { useRouter } from 'next/router'
import {Form, Button, Row} from 'react-bootstrap'
import OfferingCard from "../../components/offerings/OfferingCard";

function Search(props){
  const router = useRouter()
  const { offerings, providers, categories, searchType, isLoading } = props;
  const [ _searchType, setSearchType ] = useState(searchType);

  const selectOneEl = <option key={0} >Select One</option>

  const providerEl = [selectOneEl].concat(providers.map((item, idx) => (
      <option key={idx+1} value={item.providerId}>{item.providerId}</option>
  )));

  const categoriesEl = [selectOneEl].concat(categories.map((item, idx) => (
      <option key={idx+1} value={item.name}>{item.name}</option>
  )));

  let selectEl = null;

  if (_searchType === "provider") {
    selectEl = (<Form.Control as="select" className="mr-3 dropdown-custom" name="providerId">
      { providerEl}
    </Form.Control>);
  }

  if (_searchType === "category") {
    selectEl = (<Form.Control as="select" className="mr-3 dropdown-custom" name="category" >
      { categoriesEl }
    </Form.Control>);
  }

  const searchPlaceholder = (<Form.Label className="d-flex w-100 justify-content-center align-items-center h3 text-lightgray">
    {isLoading?"Loading results.. Please wait..":"Do a search and see the results here"}
  </Form.Label>)

  const offeringsEl = offerings.length > 0 ? offerings.map(offering => (
      <OfferingCard key={offering.dataOfferingId} {...offering} />
  )) : searchPlaceholder

  console.log("_searchType", _searchType)
  console.log("searchType", searchType)

  return (<div>
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

    <Row>
      { offeringsEl }
    </Row>
  </div>);

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

export default function Index() {
  const router = useRouter();
  const { searchType = "provider", providerId, category } = router.query;

  const { data, error } = useData(
      `/api/search?searchType=${searchType}&providerid=${providerId}&category=${category}`
  );

  if (error)
    return <ErrorC error={error} />;

  if (!data)
    return (<Layout>
      <div className="px-5">
        <Search offerings={[]} providers={[]} categories={[]} searchType={searchType} isLoading />
      </div>
    </Layout>)

  return (<Layout>
    <div className="px-5">
      <Search { ...data } searchType={searchType} />
    </div>
  </Layout>)


}



