import { useData } from '/lib/effects.js'
import { Layout, Loading, ErrorC } from '/components/common.js'

import { useState } from 'react'
import { useRouter } from 'next/router'

import { Form, Button } from 'react-bootstrap'

export default
function Search() {
  const router = useRouter();
  const { searchType = "provider", providerId, category } = router.query;
  const { data, error } = useData(
    `/api/search?searchType=${searchType}&providerid=${providerId}&category=${category}`
  );
  const [ _searchType, setSearchType ] = useState(searchType);

  if (error)
    return <ErrorC error={error} />;

  if (!data)
    return <Loading />;

  const offeringsEl = null;
  console.log(`Searching for ${searchType} pid ${providerId} cat ${category}`, data);

  let selectEl = null;
  
  if (_searchType == "provider") {
    selectEl = (<Form.Control as="select" className="mr-3"
      name="providerId" defaultValue={_searchType}>
      <option value="provider_webri">provider_webri</option>
      <option value="provider2">provider2</option>
      <option value="provider3">provider3</option>
    </Form.Control>);
  }

  if (_searchType == "category") {
    selectEl = (<Form.Control as="select" className="mr-3"
      name="category" defaultValue={category}
    >
      <option value="justice">justice</option>
      <option value="manufacturing">manufacturing</option>
      <option value="automotive">automotive</option>
      <option value="welbeing">welbeing</option>
    </Form.Control>);
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

  function onChange(e) {
    setSearchType(e.target.value);
  }

  return (<Layout>
    <div className="px-5">
      <Form className="d-flex mb-5" onSubmit={onSubmit}>
        <Form.Control as="select" onChange={onChange} className="mr-3"
          name="searchType" value={_searchType}
        >
          <option value="provider">Provider</option>
          <option value="category">Category</option>
        </Form.Control>
        { selectEl }
        <Button type="submit">Search</Button>
      </Form>
    </div>
  </Layout>);
}

