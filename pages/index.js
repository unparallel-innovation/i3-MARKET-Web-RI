import { Layout } from '/components/common.js'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { Card, Col, Row } from 'react-bootstrap'
import Image from 'next/image'

const ResponsiveGridLayout = WidthProvider(Responsive);

const categories = [{
  title: "Agriculture",
  count: 5,
}, {
  title: "Automotive",
  count: 1,
}, {
  title: "Culture",
  count: 3,
}, {
  title: "Economy",
  count: 5,
}, {
  title: "Education",
  count: 10,
}, {
  title: "Energy",
  count: 12,
}, {
  title: "Environment",
  count: 8,
}, {
  title: "Government",
  count: 10,
}, {
  title: "Health",
  count: 2,
}, {
  title: "International",
  count: 4,
}, {
  title: "Justice",
  count: 14,
}, {
  title: "Manufacturing",
  count: 20,
}, {
  title: "Regions",
  count: 2,
}, {
  title: "Science",
  count: 5,
}, {
  title: "Transport",
  count: 1,
}, {
  title: "Wellbeing",
  count: 6,
}, {
  title: "Society",
  count: 2,
}];

function NumberCard(props) {
  const { key, className, number, label } = props;

  return (
    <Card key={key} className={`${className} text-white text-center fh`}>
      <Card.Body className="d-flex align-items-center justify-content-center">
        <div>
          <div className="display-4">{number}</div>
          <div>{label}</div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default function Home() {
  const layoutA = {
    i: 'a', w: 5, h: 4, isResizable: false
  };

  const layoutB = {
    i: 'b', w: 6, h: 2, isResizable: false,
  };

  const layoutC = {
    i: 'c', w: 3, h: 2, isResizable: false,
  };

  const layoutD = {
    i: 'd', w: 3, h: 2, isResizable: false,
  };

  const layout = [
    { ...layoutA, x: 0, y: 0 },
    { ...layoutB, x: 5, y: 0 },
    { ...layoutC, x: 5, y: 2 },
    { ...layoutD, x: 8, y: 2 },
    // ...(categories.map((category, idx) => ({
    //   i: 'category' + idx, w: 2, h: 1, isResizable: false, x: 0, y: 4
    // })))
  ];

  const layouts = {
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
  };

  const categoryEl = categories.map((category, idx) => (
    <div key={"category" + idx}>
      { category.title } { category.count } 
    </div>
  ));

  return (<Layout>
    <div className="px-5">
      <ResponsiveGridLayout className="layout" 
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 11, md: 10, sm: 6, xs: 4, xxs: 3}}
        layouts={layouts}
        rowHeight={100}
      >
        {/* <div key="a" className="welcome-card p-3 d-flex align-items-center"> */}
          <Card key="a" className="welcome-card p-3 d-flex align-items-center justify-content-center">
            <Image src="/img/manufacturing_marketplace.png" className="img-fluid" />
          </Card>
        {/* </div> */}

        <Card key="b">
          <Card.Body>
            <Row className="py-3">
              <Col>
                <small className="text-muted">
                  USER
                </small>
                <h4>
                  John James Doe
                </h4>
              </Col>
              <Col>
                <small className="text-muted">
                  COMPANY
                </small>
                <h4>
                  Siemens AG
                </h4>
              </Col>
            </Row>
            <Row className="py-3 bg-light">
              <Col>
                <small className="text-muted">
                  ROLE
                </small>
                <h4>
                  Data Provider
                </h4>
              </Col>
              <Col>
                <small className="text-muted">
                  DATA PROVIDER ID
                </small>
                <h4>
                  144565266553235
                </h4>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div key="c">
          <NumberCard className="bg-primary" number={30} label="Data Providers" />
        </div>

        <div key="d">
          <NumberCard className="bg-secondary" number={150} label="Offerings Available" />
        </div>

        {/* { categoryEl } */}
      </ResponsiveGridLayout>
    </div>
  </Layout>);
}
