import { AliveScope } from 'react-activation';
export function rootContainer(container: React.ReactNode) {
  return (
    <div>
      <AliveScope>{container}</AliveScope>
    </div>
  );
}
