export function sleep(time: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

/**
 * 随机生成一个包含4个横杠的16位UUID。
 * @returns {string} 生成的UUID。
 */
export function getUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // @ts-ignore
    // tslint:disable-next-line: no-bitwise
    return (
      c === 'x' ? (Math.random() * 16) | 0 : (Math.random() * 4) | 8
    ).toString(16);
  });
}
