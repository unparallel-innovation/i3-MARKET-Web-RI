import { useData } from '/lib/effects.js'
import { Layout, ErrorC } from '/components/common.js'

import { useState } from 'react'
import { useRouter } from 'next/router'

import {Form, Button, Row} from 'react-bootstrap'
import {Loading} from "../../components/Loading";
import OfferingCard from "../../components/offerings/OfferingCard";

function Search(props) {
  const { offerings, providers, categories, searchType } = props;
  const [ _searchType, setSearchType ] = useState(searchType);

  const providerEl = providers.map((item, idx) => (
      <option key={idx} value={item}>{item}</option>
  ));

  const categoriesEl = categories.map((item, idx) => (
      <option key={idx} value={item.name}>{item.name}</option>
  ));

  let selectEl = null;

  if (_searchType === "provider") {
    selectEl = (<Form.Control as="select" className="mr-3 dropdown-custom"
      name="providerId">
      { providerEl}
    </Form.Control>);
  }

  if (_searchType === "category") {
    selectEl = (<Form.Control as="select" className="mr-3 dropdown-custom"
      name="category"
    >
      { categoriesEl }
    </Form.Control>);
  }

  const offeringsEl = offerings ? offerings.map(offering => (
      <OfferingCard key={offering.title} {...offering} />
  )) : <Col>Search for offerings</Col>;

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

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const fde = [...fd.entries()];
    const params = fde
      .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
      .join('&');
    router.push(`/search?${params}`);
  }

  function onChange(e) {
    setSearchType(e.target.value);
  }
}

export default
function Index() {
  const router = useRouter();
  const { searchType = "provider", providerId, category } = router.query;
  const { data, error } = useData(
    `/api/search?searchType=${searchType}&providerid=${providerId}&category=${category}`
  );
  // const [ _searchType, setSearchType ] = useState(searchType);

  if (error)
    return <ErrorC error={error} />;

  if (!data)
    return (<Layout>
      <div className="px-5">
        <Search offerings={[]} providers={[]} categories={[]} searchType={searchType} />
      </div>
    </Layout>);

  console.log(`Searching for ${searchType} provider ${providerId} category ${category}`, data);

  const { offerings, providers, categories} = data

  return (<Layout>
    <div className="px-5">
      <Search { ...data } searchType={searchType} />
    </div>
  </Layout>);

  // return (<Layout>
  //   <div className="px-5">
  //     <Form className="d-flex mb-5" onSubmit={onSubmit}>
  //       <Form.Control as="select" onChange={onChange} className="mr-3"
  //         name="searchType" value={_searchType}
  //       >
  //         <option value="provider">Provider</option>
  //         <option value="category">Category</option>
  //       </Form.Control>
  //       { selectEl }
  //       <Button type="submit">Search</Button>
  //     </Form>
  //
  //     <Row>
  //       { offeringsEl }
  //     </Row>
  //   </div>
  // </Layout>);
}

