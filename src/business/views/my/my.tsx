import { withKeepAlive } from '@/Enhance/withKeepLive';
import Page from '@/component/Page';
import { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

const My = () => {
  const [count, setCount] = useState(0);

  return (
    <Page navBar={{ children: 'my', backArrow: true }}>
      <div className={styles.foo}>
        <h1>My</h1>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>add</button>
        <button onClick={() => history.push('/home')}>go home</button>
      </div>
    </Page>
  );
};

export default withKeepAlive(My);
