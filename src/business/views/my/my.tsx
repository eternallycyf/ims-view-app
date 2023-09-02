import { withKeepAlive, withRoutePage, withRouter } from '@/Enhance';
import Page from '@/components/Page';
import { ConnectState } from '@/typings/connect';
import { connect } from '@umijs/max';
import { useState } from 'react';
import { compose } from 'redux';
import { history } from 'umi';
import styles from './index.less';

const My = (props) => {
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

export default compose(
  withRoutePage,
  withRouter,
  connect(({ login, global }: ConnectState) => ({ ...login, global })),
  withKeepAlive,
)(My);
