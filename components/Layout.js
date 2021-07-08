import Head from 'next/head'
import Link from 'next/link'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { PersonCircle, Bell } from 'react-bootstrap-icons'

export default function Layout(props) {
  const { className, children } = props;

  return (<div>
    <Head>
      <title>i3market-webri</title>
      {/* <meta name="description" content="Generated by create next app" /> */}
      {/* <link rel="icon" href="/favicon.ico" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <header>
      <Navbar className="px-5 py-3" sticky="top">
        <Navbar.Brand href="/">
          <img height="32" src="/img/web-ri_logo.png" />
        </Navbar.Brand>
        <Nav className="justify-content-end" style={{ width: "100%" }}>
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
      </Navbar>
    </header>

    <main className={className + " py-3"}>
      {children}
    </main>

    <footer className="px-5 py-3 d-flex">
      <img height="36" src="/img/EU_flag.png" />
      <small className="ml-2 flex-grow-1">
        i3-Market has received funding from the European Union's<br />
        Horizon 2020 research and innovation programme under<br />
        grant agreement no. B71754
      </small>
      <small className="ml-2">
        Privacy Policy
      </small>
      <img height="36" src="/img/i3-MARKET-LOGO_2nd_Release.png"
        className="ml-2" />
    </footer>
  </div>);
}
