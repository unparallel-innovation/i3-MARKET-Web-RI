import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Nav, Navbar } from 'react-bootstrap';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import Breadcrumbs from 'nextjs-breadcrumbs';
import Footer from '../common/Footer';
import { useData } from '../../lib/hooks';

export default
function Layout(props) {
    const { className, children, noRedirect, noBreadcrumbs } = props;
    const router = useRouter();
    const { data }  = useData('/api/user');

    if(data){
        const user = data.user
        return (
            <div className="d-flex flex-column vw-100 vh-100">
                <Head>
                    <title>i3-Market Web-RI</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                </Head>

                <header>
                    <Navbar className="px-5" expand="md">
                        <Link href="/" passHref>
                            <Navbar.Brand>
                                <Image height={55} width={115} src="/img/WEB-RI_logo.png" alt="Web-ri logo" />
                            </Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="justify-content-end" style={{ width: '100%' }}
                                 defaultActiveKey={router.pathname}
                            >
                                { user.provider ? (
                                    <Link href="/offerings" passHref>
                                        <Nav.Link>Offerings</Nav.Link>
                                    </Link>
                                ) : null }
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
                                <Link href="/notificationCenter" passHref>
                                    <Nav.Link className="px-2">
                                        <Bell size={24} />
                                    </Nav.Link>
                                </Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>

                <div className="flex-grow-1 overflow-scroll d-flex flex-column">
                    <main className={(className || '') + ' flex-grow-1'}>
                        { noBreadcrumbs ? null : (
                            <div className="px-5 breadcrumbs py-4 pb-5">
                                <Breadcrumbs rootLabel="Home" />
                            </div>
                        ) }

                        { children }
                    </main>

                    <Footer />
                </div>
            </div>);
    }
    return ''
}
