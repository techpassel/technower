import '../styles/globals.scss';
import Layout from '../components/layout/Layout';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Provider } from 'react-redux';
import {store, wrapper} from '../store/store';

config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <div className="main-body">
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp);
