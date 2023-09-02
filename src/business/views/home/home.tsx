import { withKeepAlive } from '@/Enhance/withKeepLive';
import Page from '@/component/Page';
import { handleCopyText } from '@/utils/global';
import { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <Page navBar={{ children: 'home', backArrow: true }}>
      <div className={styles.foo}>
        <h1>home</h1>
        <p onClick={() => handleCopyText('ssss')}>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>add</button>
        <button onClick={() => history.push('/my')}>go my</button>
      </div>
    </Page>
  );
};

export default withKeepAlive(Home);
