import {SWRConfig} from 'swr';
import '../styles/global.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function MyApp({ Component, pageProps }) {

    function onError(error, key) {
    // alert(error.message);
    }

    const options = {
        onError,
    };

    return (
        <SWRConfig value={options}>
            <Component {...pageProps} />
        </SWRConfig>
    );
}

export default MyApp;
