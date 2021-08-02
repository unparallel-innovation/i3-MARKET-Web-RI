import {useEffect, useState} from 'react'
import {useData} from '/lib/effects.js'
import {ErrorC, Layout} from '/components/common.js'
import {Loading} from "/components/Loading.js";
import user from '/lib/user.js'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { Card, Col, Row } from 'react-bootstrap'
import Image from 'next/image'

const ResponsiveGridLayout = WidthProvider(Responsive);

function getFromLS(defaultValue) {
  let ret = defaultValue;

  if (typeof window === 'undefined')
    return ret;

  try {
    let val = JSON.parse(localStorage.getItem("homeLayouts"));
    if (val)
      ret = val;
  } catch (e) {
  }

  // console.log('getFromLS', defaultValue, ret);

  return ret;
}

function ErrorCard(props) {
    const { error } = props;

    return (
        <Card className="bg-danger text-white fh">
            <Card.Body className="d-flex align-items-center justify-content-center">
                { error.message }
            </Card.Body>
        </Card>
    );
}

function NumberCard(props) {
  const { className, number = "-", label } = props;

  return (
    <Card className={`${className} text-white text-center fh`}>
      <Card.Body className="d-flex align-items-center justify-content-center">
        <div>
          <div className="display-4">{number}</div>
          <div>{label}</div>
        </div>
      </Card.Body>
    </Card>
  );
}

function ProvidersNumberCard(props) {
  const { data, error } = useData('/api/getProvidersN');

  // if (error)
  //   return <ErrorCard error={error} />;

  if (error || !data)
    return <NumberCard className="bg-primary" label="Data Providers" />;

  const { providersN } = data;

  return <NumberCard className="bg-primary" number={providersN} label="Data Providers" />
}

function OfferingsNumberCard(props) {
  const { data, error } = useData('/api/getOfferingsN');

  // if (error)
  //   return <ErrorCard error={error} />;

  if (error || !data)
    return <NumberCard className="bg-secondary" label="Offerings Available" />;

  const { offeringsN } = data;

  return <NumberCard className="bg-secondary" number={offeringsN} label="Offerings Available" />;
}

function CategoryCardPure(props) {
  const { name, number = '-' } = props;

  return (
    <Card className="fh">
        <Card.Body className="d-flex align-items-center justify-content-between">
            { name }
            <span className="ml-3 h3 text-primary">{ number }</span>
        </Card.Body>
    </Card>
  );
}

function CategoryCard(props) {
  const { name } = props;
  const { data, error } = useData(`/api/getCategoryOfferingsN?category=${name}`);

  // if (error)
  //   return <ErrorCard error={error} />;

  if (error || !data)
    return <CategoryCardPure name={name} />;

  const { offeringsN } = data;

  return <CategoryCardPure name={name} number={offeringsN} />;
}

function HomePure(props) {
  const {
    categories = []
  } = props;

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

  function getCategoriesLayout(y, ncols) {
    let res = [];
    let i, x;

    for (
      i = 0, x = 0;
      i < categories.length;
      i++
    ) {
      res.push({
        i: 'category' + i, w: 2, h: 1, isResizable: false,
        x, y
      });

      x += 2;
      if (x + 2 > ncols) {
        x = 0;
        y ++;
      }
    }

    return res;
  }

  const layouts = {
    lg: [
      { ...layoutA, x: 0, y: 0 },
      { ...layoutB, x: 5, y: 0 },
      { ...layoutC, x: 5, y: 2 },
      { ...layoutD, x: 8, y: 2 },
      ...getCategoriesLayout(4, 11),
    ],
    md: [
      { ...layoutA, x: 0, y: 0, w: 4 },
      { ...layoutB, x: 4, y: 0 },
      { ...layoutC, x: 4, y: 2 },
      { ...layoutD, x: 7, y: 2 },
      ...getCategoriesLayout(4, 10),
    ],
    sm: [
      { ...layoutA, x: 0, y: 0, w: 6 },
      { ...layoutB, x: 0, y: 4 },
      { ...layoutC, x: 0, y: 6 },
      { ...layoutD, x: 3, y: 6 },
      ...getCategoriesLayout(8, 6),
    ],
    xs: [
      { ...layoutA, x: 0, y: 0 },
      { ...layoutB, x: 0, y: 4 },
      { ...layoutC, x: 0, y: 6, w: 2 },
      { ...layoutD, x: 2, y: 6, w: 2 },
      ...getCategoriesLayout(8, 4),
    ],
  };

  // console.log("RENDER", layouts, _layouts);
  // console.log("RENDER", layouts);

  // const [ _layouts, setLayouts ] = useState(getFromLS(layouts));

  // useEffect(() => {
  //   // setLayouts(layouts);
  //   setLayouts(getFromLS(layouts));
  // }, [categories]);

  function onLayoutChange(layout, layouts) {
    // setLayouts(layouts);
    console.log("onChange", layouts, categories);
    // if (categories.length)
    //   localStorage.setItem("homeLayouts", JSON.stringify(layouts));
  }

  const categoryEl = categories.map((category, idx) => (
      <div key={"category" + idx}>
          <CategoryCard name={category.category} />
      </div>
  ));

  return (<Layout>
    <div className="px-5">
      <ResponsiveGridLayout className="layout"
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 11, md: 10, sm: 6, xs: 4, xxs: 3}}
        layouts={layouts}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
      >
        <Card key="a" className="welcome-card d-flex align-items-center justify-content-center">
          <Image src="/img/Web-ri_sep.png" layout="fill" objectFit="contain" className="p-3" />
        </Card>

        <Card key="b">
          <Card.Body>
            <Row className="py-3">
              <Col>
                <small className="text-muted">
                  USER
                </small>
                <h4>
                  { user.name }
                </h4>
              </Col>
              <Col>
                <small className="text-muted">
                  COMPANY
                </small>
                <h4>
                  { user.company }
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
                  { user.providerId }
                </h4>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div key="c">
          <ProvidersNumberCard />
        </div>

        <div key="d">
          <OfferingsNumberCard />
        </div>

        { categoryEl }
      </ResponsiveGridLayout>
    </div>
  </Layout>);
}

export default function Home() {
  const { data, error } = useData('/api/');

  if (error)
    return <ErrorC error={error} />;

  if (!data)
    return <HomePure />;

  return <HomePure { ...data } />;
}
