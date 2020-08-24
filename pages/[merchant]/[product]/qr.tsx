import { useRouter } from "next/router";
import QRCode from "qrcode.react";

export default function QRCodePage() {
  const router = useRouter();
  const { merchant, product: productId } = router.query;
  if (!productId) return <div>loading...</div>;
  return (
    <QRCode
      includeMargin={true}
      value={`${process.env.NEXT_PUBLIC_URL}/${merchant}/${productId}`}
    />
  );
}
