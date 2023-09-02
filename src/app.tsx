import { AliveScope } from 'react-activation';

function Init(props: any) {}

export function rootContainer(container: React.ReactNode) {
  return (
    <div>
      <AliveScope>{container}</AliveScope>
    </div>
  );
}
