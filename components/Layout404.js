import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Nav, Navbar } from 'react-bootstrap';
import { Bell, PersonCircle } from 'react-bootstrap-icons';
import useUser from '/lib/user.js';

import Breadcrumbs from 'nextjs-breadcrumbs';

export default
function Layout404(props) {
    const { className, children } = props;

    const router = useRouter();



    return (<div className="d-flex flex-column vw-100 vh-100">
        <Head>
            <title>i3-Market Web-RI</title>
            {/* <meta name="description" content="Generated by create next app" /> */}
            {/* <link rel="icon" href="/favicon.ico" /> */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
        </Head>

        <header>
            <Navbar className="px-5 py-3" expand="md">
                <Link href="/" passHref>
                    <Navbar.Brand>
                        <Image height="32" width="122"
                            src="/img/Web-ri_sep.png" alt="Web-ri logo" />
                    </Navbar.Brand>
                </Link>

            </Navbar>
        </header>

        <div className="flex-grow-1 overflow-scroll d-flex flex-column">
            <main className={(className || '') + ' flex-grow-1'}>

                { children }
            </main>

            <footer className="px-5 py-4">
                <div className="d-flex align-items-center">
                    <Image height="36" width="54"
                        src="/img/EU_flag.png" alt="EU flag" />

                    <div className="ml-3 flex-grow-1">
                        <small className="d-inline-block" style={{ maxWidth: '460px' }} >
                            i3-Market has received funding from the European Union&apos;s Horizon 2020
                            research and innovation programme under grant agreement no. B71754
                        </small>
                    </div>

                    <small className="ml-3 mr-4 align-self-start">
                        Privacy Policy
                    </small>
                    <Image height="48" width="61"
                        src="/img/i3-MARKET-LOGO_2nd_Release.png"
                        alt="i3Market logo" />
                </div>

            </footer>
        </div>
    </div>);
}

