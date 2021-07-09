import { useData } from '/lib/effects.js'
import { Layout, Loading, ErrorC } from '/components/common.js'
import colors from '/lib/colors.js'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Card, Row, Col, Badge, Pagination } from 'react-bootstrap'
// import { BsLock, BsGlobe } from 'react-icons/bs'
import { Lock, Globe, ExclamationCircle, PlusCircle } from 'react-bootstrap-icons'

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
      <Card className="overflow-hidden cursor-pointer mb-3"
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
    return <ErrorC error={error} />;

  if (!data)
    return <Loading />;

  const offeringsEl = data.map(offering => (
    <OfferingCard key={offering.title} {...offering} />
  ));

  return (<Layout className="px-5">
    <div className="d-flex p-3">
      <h1 className="flex-grow-1">Offerings</h1>
      <div className="text-primary">
        <PlusCircle color={colors.primary} size={24} />
        <span className="ml-2">Add new</span>
      </div>

    </div>
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

