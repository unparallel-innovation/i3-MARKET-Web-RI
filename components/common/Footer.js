import Image from 'next/image';

export default function Footer(){
    return (
        <footer className="px-5 py-4">
            <div className="d-flex h-100 align-items-center">
                <Image height="36" width="54" src="/img/EU_flag.png" alt="EU flag" />

                <div className="ml-3 flex-grow-1">
                    <small className="d-inline-block" style={{ maxWidth: '460px' }} >
                        i3-Market has received funding from the European Union&apos;s Horizon 2020
                        research and innovation programme under grant agreement no. 871754
                    </small>
                </div>

                {/*<small className="ml-3 mr-4">Privacy Policy</small>*/}
                <a target="_blank" href="https://www.i3-market.eu/" rel="noreferrer">
                    <Image height="48" width="61" src="/img/i3_market_logo.png" alt="i3Market logo" style={{ cursor: 'pointer' }} />
                </a>

            </div>
        </footer>
    )
}
