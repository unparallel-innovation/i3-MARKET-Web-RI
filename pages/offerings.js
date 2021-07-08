import { useData } from '/lib/effects.js'
import Layout from '/components/Layout.js'
import colors from '/lib/colors.js'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Card, Row, Col, Badge, Pagination } from 'react-bootstrap'
// import { BsLock, BsGlobe } from 'react-icons/bs'
import { Lock, Globe, ExclamationCircle } from 'react-bootstrap-icons'

function OfferingCard(props) {
  const router = useRouter();
  const {
    title, description, active,
    hasContractWarning, dataOfferingId
  } = props;

  const visIconEl = active === "yes"
    ? <Globe color={colors.primary} />
    : <Lock color={colors.primary} />;

  let warningIconEl = null;

  if (hasContractWarning) {
    warningIconEl = (
      <span className="p-2 px-3 bg-warning">
        <ExclamationCircle size={24}/>
      </span>
    );
  }

  function onClick() {
    router.push('/offering/' + dataOfferingId);
  }

  return (
    <Col xs="12" md="6">
      <Card className="overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            { title }
            { visIconEl }
          </Card.Title>
          <Card.Text>{ description }</Card.Text>
        </Card.Body>
        <div className="d-flex bg-light">
          <span className="p-2 flex-grow-1">
            <Badge pill variant="primary">X Contracts</Badge>
          </span>
          { warningIconEl }
        </div>
      </Card>
    </Col>);
}

export default function Offerings() {
  const providerId = 'ADV01';
  const { data, error } = useData(`/api/offerings/${providerId}`);

  if (error)
    return <Layout>Offerings failed to load</Layout>;

  if (!data)
    return <Layout>Loading...</Layout>;

  const offeringsEl = data.map(offering => (
    <OfferingCard key={offering.title} {...offering} />
  ));

  return (<Layout className="px-5">
    <h1>Offerings</h1>
    <Row>
      { offeringsEl }
    </Row>
    {/* <Pagination className="justify-content-center"> */}
    {/*   <Pagination.First /> */}
    {/*   <Pagination.Prev /> */}
    {/*   <Pagination.Item>{1}</Pagination.Item> */}
    {/*   <Pagination.Item>{2}</Pagination.Item> */}
    {/*   <Pagination.Item>{3}</Pagination.Item> */}
    {/*   <Pagination.Next /> */}
    {/*   <Pagination.Last /> */}
    {/* </Pagination> */}
  </Layout>);
}

