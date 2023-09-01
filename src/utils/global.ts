import { Message } from '@/component/Widget/Message';

export const WEEKS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export function handleCopyText(text: string) {
  let textValue = document.createElement('textarea');
  textValue.setAttribute('readonly', 'readonly'); // 设置只读 避免手机弹出软键盘
  textValue.value = text;
  document.body.appendChild(textValue);
  textValue.select();
  let res = document.execCommand('copy');
  document.body.removeChild(textValue);
  Message('复制成功', 'success');
  return res;
}
