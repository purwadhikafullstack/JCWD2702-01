import Image from 'next/image';
import styles from './page.module.css';
import LandingPage from '@/components/landing_page/LandingPage';
export default function Home() {
  return (
    <main>
      <LandingPage></LandingPage>
    </main>
  );
}
