import { withRoutePage, withRouter } from '@/Enhance';
import Page from '@/components/Page';
import { ConnectState } from '@/typings/connect';
import { handleCopyText } from '@/utils/global';
import { connect, history } from '@umijs/max';
import { useState } from 'react';
import { compose } from 'redux';
import styles from './index.less';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <Page navBar={{ children: 'home', backArrow: true }}>
      <div className={styles.foo}>
        <h1>home</h1>
        <p onClick={() => handleCopyText('ssss')}>count: {count}</p>
        <button type="button" onClick={() => setCount(count + 1)}>
          add
        </button>
        <button type="button" onClick={() => history.push('/my')}>
          go my
        </button>
      </div>
    </Page>
  );
};
export default compose(
  withRoutePage,
  withRouter,
  connect(({ login, global }: ConnectState) => ({ ...login, global })),
)(Home);
