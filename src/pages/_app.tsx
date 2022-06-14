import { AutenticacaoProvider } from '../contexts/AutenticacaoContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/styles.css';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
    return (
        <>
        <Head>
            <title>My new cool app</title>
        </Head>
        <AutenticacaoProvider>
            <Component {...pageProps} />
        </AutenticacaoProvider>
        </>

    )
}

export default MyApp
