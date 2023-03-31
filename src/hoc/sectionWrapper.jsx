import { motion } from 'framer-motion'
import { styles } from '../styles'
import { staggerContainer } from '../utils/motion'

const sectionWrapper = (Component, idName)  => // this higher component it made to animate and center the content of the components that are passed into it
function HOC() {
  return (
        <motion.section variants={staggerContainer()} initial='hidden' whileInView='show' viewport={{once: true, amount: 0.25}} className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
            <span className='hash-span' id={idName}>&nbsp;</span> {/* When we click our slider this is what will we will scroll down to */}
            <Component />
        </motion.section>
    )
}

export default sectionWrapper