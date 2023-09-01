import QRCode from 'qrcode';

export async function getQRCode(url: string) {
  const qrCodeUrl = await QRCode.toDataURL(url);
  return qrCodeUrl;
}
