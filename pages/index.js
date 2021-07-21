import { Layout } from '/components/common.js'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { Card } from 'react-bootstrap'

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Home() {
  const layoutA = {
    i: 'a', w: 3, h: 1, isResizable: false
  };

  const layoutB = {
    i: 'b', w: 3, h: 2, isResizable: false,
  };

  const layoutC = {
    i: 'c', w: 3, h: 2, isResizable: false,
  };

  const layout = [
    { ...layoutA, x: 0, y: 0 },
    { ...layoutB, x: 3, y: 0 },
    { ...layoutC, x: 0, y: 1 },
  ];

  const layouts = {
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
  };

  const providersEl = [
    <div key={0}>Provider1</div>,
    <div key={1}>Provider2</div>,
    <div key={2}>Provider3</div>,
    <div key={3}>Provider4</div>,
  ];

  const categoriesEl = [
    <div key={0}>Manufacturing</div>,
    <div key={1}>Automotive</div>,
    <div key={2}>Wellbeing</div>,
  ];

  return (<Layout>
    <div className="px-5 bg-light">
      <ResponsiveGridLayout className="layout" 
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 10, md: 8, sm: 6, xs: 4, xxs: 3}}
        layouts={layouts}
      >
        <Card key="a">
          <Card.Body>
            <Card.Title>Welcome to i3Market Web-RI</Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card key="b">
          <Card.Body>
            <Card.Title>Providers</Card.Title>
            <Card.Text>
            </Card.Text>
            <div>
              { providersEl }
            </div>
          </Card.Body>
        </Card>
        <Card key="c">
          <Card.Body>
            <Card.Title>Categories</Card.Title>
            <Card.Text>
            </Card.Text>
            <div>
              { categoriesEl }
            </div>
          </Card.Body>
        </Card>
      </ResponsiveGridLayout>
      <h1>Industrial data marketplace</h1>
      <h2>Turn manufacturing data into business</h2>
      <img src="/img/Siemens_Marketplace_keyvisual_2.jpeg" className="img-fluid"/>
    </div>
  </Layout>);
}
