import { useData } from '/lib/effects.js'
import { Layout, Loading, ErrorC } from '/components/common.js'
import colors from '/lib/colors.js'

import { useRouter } from 'next/router'

import { Card, Row, Col, Badge, Pagination } from 'react-bootstrap'
import { Lock, Globe, ExclamationCircle, PlusCircle } from 'react-bootstrap-icons'

function OfferingCard(props) {
  const router = useRouter();
  const {
    title, description, active,
    hasContractWarning, dataOfferingId,
    activeContracts
  } = props;

  const visIconEl = active === "yes"
    ? <Globe color={colors.primary} size={24} />
    : <Lock color={colors.primary} size={24} />;

  let warningIconEl = null;

  if (hasContractWarning) {
    warningIconEl = (
      <span className="p-2 px-3 bg-warning">
        <ExclamationCircle size={24}/>
      </span>
    );
  }

  function onClick() {
    router.push('/offerings/' + dataOfferingId);
  }

  return (
    <Col xs="12" md="6" xl="4">
      <Card className="overflow-hidden cursor-pointer mb-3"
        onClick={onClick}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-between line-clamp-2 h3rem">
            { title }
            { visIconEl }
          </Card.Title>
          <Card.Text className="line-clamp-2 h3rem">
            { description }
          </Card.Text>
        </Card.Body>
        <div className="d-flex bg-light">
          <span className="p-2 flex-grow-1">
            <Badge pill variant="primary">
              { activeContracts || 0 } Contracts
            </Badge>
          </span>
          { warningIconEl }
        </div>
      </Card>
    </Col>);
}

export default function Offerings() {
  const router = useRouter();

  // const providerId = 'provider_webri';
  const providerId = 'Siemens_AG';
  const { data, error } = useData(`/api/offerings/${providerId}`);

  if (error)
    return <ErrorC error={error} />;

  if (!data)
    return <Loading />;

  const offeringsEl = data.map(offering => (
    <OfferingCard key={offering.title} {...offering} />
  ));

  function onClick() {
    router.push('/offerings/register');
  }

  return (<Layout>
    <div className="px-5">
      <div className="d-flex align-items-center mb-2">
        <div className="flex-grow-1"></div>
        <div className="text-primary" onClick={onClick} >
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
    </div>
  </Layout>);
}

