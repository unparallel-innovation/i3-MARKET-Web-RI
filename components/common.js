import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { PersonCircle, Bell } from 'react-bootstrap-icons'

import Breadcrumbs from 'nextjs-breadcrumbs'

export function Layout(props) {
  const { className, children } = props;
  const router = useRouter();

  return (<div className="d-flex flex-column fvw fvh">
    <Head>
      <title>i3market-webri</title>
      {/* <meta name="description" content="Generated by create next app" /> */}
      {/* <link rel="icon" href="/favicon.ico" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <header>
      <Navbar className="px-5 py-3" expand="md">
        <Link href="/" passHref>
          <Navbar.Brand>
            {/* <img height="32" src="/img/web-ri_logo.png" /> */}
            <img height="32" src="/img/Web-ri_sep.png" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}
            defaultActiveKey={router.pathname}
          >
            <Link href="/offerings" passHref>
              <Nav.Link>Offerings</Nav.Link>
            </Link>
            <Link href="/contracts" passHref>
              <Nav.Link>Contracts</Nav.Link>
            </Link>
            <Link href="/transactions" passHref>
              <Nav.Link>Transactions</Nav.Link>
            </Link>
            <Link href="/search" passHref>
              <Nav.Link>Search</Nav.Link>
            </Link>
            <Link href="/alerts" passHref>
              <Nav.Link>Alerts</Nav.Link>
            </Link>
            <Link href="/account" passHref>
              <Nav.Link className="px-2">
                <PersonCircle size={24} />
              </Nav.Link>
            </Link>
            <Link href="/notificationCentre" passHref>
              <Nav.Link className="px-2">
                <Bell size={24} />
              </Nav.Link>
            </Link>
          </Nav>
          </Navbar.Collapse>
      </Navbar>
    </header>

    <div className="flex-grow-1 overflow-scroll">
      <main className={className || ''}>
        <div className="px-5 breadcrumbs py-4 pb-5">
          <Breadcrumbs rootLabel="Home" />
        </div>
        {children}
      </main>

      <footer className="px-5 py-4 d-flex align-items-center">
        <img height="36" src="/img/EU_flag.png" />
        {/* <small className="ml-3 flex-grow-1"> */}
        <h6 className="ml-3 flex-grow-1">
          <small>
            i3-Market has received funding from the European Union's Horizon 2020 <br />
            research and innovation programme under grant agreement no. B71754
          </small>
        </h6>
        {/* </small> */}
        <small className="ml-3 align-self-start">
          Privacy Policy
        </small>
        <img height="48" src="/img/i3-MARKET-LOGO_2nd_Release.png"
          className="ml-4" />
      </footer>
    </div>
  </div>);
}

export function Loading() {
  return (<Layout>
    <div className="px-5 py-3">
      Loading...
    </div>
  </Layout>);
}

export function ErrorC(props) {
  const { error } = props;
  console.log(error);

  return (<Layout>
    <div className="px-5 py-3">
      Error
      { error }
    </div>
  </Layout>);
}
