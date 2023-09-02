import { FC } from 'react';
import { iconFontJSON } from './iconfont';
import styles from './index.less';

type IconType = (typeof iconFontJSON)['glyphs'][number]['font_class'];
type CapitalizeStr<Str extends string> = Str extends `${infer Rest}`
  ? `icon-${Rest}`
  : Str;
interface IconProps extends React.HTMLProps<HTMLSpanElement> {
  type: CapitalizeStr<IconType>;
  spin?: boolean;
  rotate?: number;
}

const Icon: FC<IconProps> = (props) => {
  const { type, className, ...restProps } = props;
  return (
    <span
      className={`${styles['iconfont']} ${styles[type]} ${className}`}
      {...restProps}
    />
  );
};

export default Icon;
