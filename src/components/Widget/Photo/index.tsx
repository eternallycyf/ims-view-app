import styles from './index.less';

interface IPhotoProps {
  name: string;
  src?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Photo: React.FC<IPhotoProps> = (props) => {
  const { name, src, style, className } = props;
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={style}
        className={`${styles.photo} ${className}`}
      />
    );
  } else {
    return (
      <div style={style} className={`${styles.photo} ${className}`}>
        {name.slice(0, 1)}
      </div>
    );
  }
};

export default Photo;
