import Head from 'next/head'
import Link from 'next/link'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default function Layout(props) {
  return (<div>
    <Head>
      <title>i3market-webri</title>
      {/* <meta name="description" content="Generated by create next app" /> */}
      {/* <link rel="icon" href="/favicon.ico" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>

    <header>
      <Navbar sticky="top">
        <Navbar.Brand href="#home">i3market web-ri</Navbar.Brand>
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
          </Link>
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
        </Nav>
      </Navbar>
    </header>

    <main>
      {props.children}
    </main>

    <footer>
    </footer>
  </div>);
}
