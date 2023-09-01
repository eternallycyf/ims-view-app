import { ErrorBlock } from 'antd-mobile';
export default () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorBlock status="empty" />
    </div>
  );
};
