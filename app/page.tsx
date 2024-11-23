import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Secure Store Nepal</h1>
      <p>Affordable, Secure, Flexible Storage Solutions</p>
      <Link href="/users">Manage Users</Link>
      <Link href="/storage-units">Manage Storage Units</Link>
    </div>
  );
}