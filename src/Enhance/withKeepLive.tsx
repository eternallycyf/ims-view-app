import KeepAlive, { KeepAliveProps } from 'react-activation';

interface IWithKeepAliveProps extends Omit<KeepAliveProps, 'children'> {}

export const withKeepAlive = <Props extends IWithKeepAliveProps>(
  Component: React.ComponentType<Omit<Props, keyof KeepAliveProps>>,
  keepAliveProps?: Props,
) => {
  const WithKeepAlive = (props: Props) => {
    return (
      <KeepAlive name={Component.name} {...keepAliveProps}>
        <Component {...props} />
      </KeepAlive>
    );
  };

  return WithKeepAlive;
};
