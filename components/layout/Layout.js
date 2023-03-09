import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import Footer from '../common/Footer';
import { useData } from '../../lib/hooks';
import { useEffect, useState } from 'react';

export default
function Layout(props) {
    const router = useRouter();
    const { className, children, noRedirect, noBreadcrumbs } = props;
    const [notifications, setNotifications] = useState(0);
    const { data } = useData('/api/user');

    useEffect(()=>{
        let destroy = false;

        function getData() {
            fetch('/api/notification', {
                method: 'GET',
            }).then(res=>{
                res.json().then(json=>{
                    setNotifications(json.unreadNotifications.length);
                    setTimeout(()=>{
                        if (destroy) {
                            return;
                        }
                        getData();
                    },1 * 60 * 1000);
                });
            });
        }
        getData();
        return function cleanup() {
            destroy = true;
        };
    },[]);

    // useEffect(() => {
    //
    //     let destroy = false;
    //     async function getData() {
    //         const wallet = await walletApi();
    //         const resources = await wallet.resources.list({ type: 'KeyPair', identity: data.user.DID });
    //
    //         fetch(`/api/notification?keys=${JSON.stringify(resources)}`, {
    //             method: 'GET',
    //         }).then(res=>{
    //             res.json().then(json=>{
    //                 setNotifications(json.unreadNotifications.length);
    //                 setTimeout(()=>{
    //                     if (destroy) {
    //                         return;
    //                     }
    //                     getData();
    //                 },1 * 60 * 1000);
    //             });
    //         });
    //
    //     }
    //
    //     getData();
    //     return function cleanup() {
    //         destroy = true;
    //     };
    // }, []);

    if (data) {
        const user = data.user;

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
                                { user.consumer ? (
                                    <Link href="/contracts" passHref>
                                        <Nav.Link>Contracts</Nav.Link>
                                    </Link>
                                ) : null }
                                <Link href="/search" passHref>
                                    <Nav.Link>Search</Nav.Link>
                                </Link>
                                <Link href="/" passHref >
                                    <NavDropdown id="basic-nav-dropdown" title={<PersonCircle size={24}/>} alignRight>
                                        <NavDropdown.Item disabled>
                                            <Nav.Item>{user.username}</Nav.Item>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link href="/api/logout" passHref>
                                                <Nav.Link>Log Out</Nav.Link>
                                            </Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Link>
                                <Link href="/notifications" passHref>
                                    <Nav.Link className="px-2">
                                        <Bell size={24} /><span className="badge badge-primary ml-1">{notifications}</span>
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>

                <div className="flex-grow-1 overflow-scroll d-flex flex-column">
                    <div className={(className || '') + ' flex-grow-1 py-4'}>
                        { children }
                    </div>

                    <Footer />
                </div>
            </div>);
    }
    return '';
}
