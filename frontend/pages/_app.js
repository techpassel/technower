import '../styles/globals.scss';
import Layout from '../components/layout/Layout';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className="main-body">
        <Component {...pageProps} />
      </div>
    </Layout>
  )
}

export default MyApp
