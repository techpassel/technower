import styles from '../styles/Home.module.scss'
import AppHead from '../components/layout/AppHead'
import Intro from '../components/Intro'
import Info from '../components/Info'
import { data, users } from '../data'
import Service from '../components/Service'
import Testimonial from '../components/Testimonial'

export default function Home({ services, testimonialUsers }) {
  return (
    <div className={styles.container}>
      <AppHead title="Technower - Home" description="Home page of technower." />
      <Intro />
      <Info />
      <Service services={services} />
      <Testimonial users={testimonialUsers} />
      {/* 
        We can use following also in place of above one as "users" is available directly here also.
        We have intentionally passed data with new name "" to explore how to pass data in props.
        Otherwise even passing second props is not required as "users" is available here directly 
        as we have imported it here from "data.js" file. So we can get the same result with following code also.
        ------------------------------------------------------------------------ 
        export default function Home({ services }) {
        .....
        .....
        <Testimonial users={users} />
        .....
        .....
        ------------------------------------------------------------------------
      */}
    </div>
  )
}

export const getStaticProps = async () => {
  // const services = await Axios.get();
  const services = data;
  return {
    props: { services, testimonialUsers: users }
  }
}