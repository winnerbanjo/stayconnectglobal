import { redirect } from 'next/navigation';

export default function PartnerPage() {
  // Partner login portal is removed; all host applications are submitted via /list-your-property
  redirect('/list-your-property');
}
