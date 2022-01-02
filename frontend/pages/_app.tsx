import { ApolloProvider } from '@apollo/client';
import Layout from '../components/App/Layout/Layout';
import AppContext from '../hooks/AppContext';
import withData from '../lib/withData';

function MyApp({ Component, pageProps, apollo }: any) {
  return (
    <ApolloProvider client={apollo}>
      <AppContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }: any) {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
