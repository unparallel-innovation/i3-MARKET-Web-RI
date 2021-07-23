import {useData} from '/lib/effects.js'
import {ErrorC, Layout} from '/components/common.js'
import colors from '/lib/colors.js'
import user from '/lib/user.js'
import {useRouter} from 'next/router'
import {Row} from 'react-bootstrap'
import {PlusCircle} from 'react-bootstrap-icons'
import {Loading} from "../../components/Loading";
import OfferingCard from "../../components/offerings/OfferingCard";

export default function Offerings() {
  const router = useRouter();

  const { data, error } = useData(`/api/offerings/${user.providerId}`);

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
        <div className="text-primary cursor-pointer" onClick={onClick} >
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

