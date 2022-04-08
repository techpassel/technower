import styles from '../styles/Home.module.scss'
import AppHead from '../components/layout/AppHead'
import Intro from '../components/Intro'
import Info from '../components/Info'
import { data, users } from '../data'
import Service from '../components/Service'
import Testimonial from '../components/Testimonial'

export default function Home({ services }) {
  return (
    <div className={styles.container}>
      <AppHead title="Technower - Home" description="Home page of technower." />
      <Intro />
      <Info />
      <Service services={services} />
      <Testimonial users={users} />
    </div>
  )
}

export const getStaticProps = async () => {
  // const services = await Axios.get();
  const services = data;
  return {
    props: { services, users }
  }
}