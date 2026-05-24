import { motion } from 'framer-motion'
import {
  Plane,
  Home,
  Hourglass,
  Compass,
  Baby,
  TreePine,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

const DREAMS = [
  {
    title: 'Umrah Together',
    description:
      'Hand in hand at the doorstep of the Kaʿbah, asking Allah to keep us close in this life and the next.',
    icon: Plane,
    palette: 'from-rosegold-100 to-rosegold-200',
  },
  {
    title: 'A Peaceful Home',
    description:
      'A home that smells like coffee, sounds like Qur’an, and feels like the safest place either of us has known.',
    icon: Home,
    palette: 'from-softgold-100 to-softgold-200',
  },
  {
    title: 'Growing Old Together',
    description:
      'Quiet evenings, grey hair, slower walks — still holding your hand a little tighter every year.',
    icon: Hourglass,
    palette: 'from-beige-100 to-cream-200',
  },
  {
    title: 'Endless Adventures',
    description:
      'Mountains, oceans, cities, and quiet roads — collecting memories with my favourite traveller.',
    icon: Compass,
    palette: 'from-cream-200 to-rosegold-100',
  },
  {
    title: 'Raising Beautiful Children',
    description:
      'Little ones who carry your kindness, your laugh, and your love for Allah, inshaAllah.',
    icon: Baby,
    palette: 'from-rosegold-100 to-softgold-100',
  },
  {
    title: 'Jannah Together InshaAllah',
    description:
      'Above every dream — to meet you again on the other side, where there are no more goodbyes.',
    icon: TreePine,
    palette: 'from-softgold-200 to-rosegold-200',
  },
]

export default function Future() {
  return (
    <section
      id="future"
      className="section-pad relative isolate bg-cream-50 dark:bg-nightblue-900 overflow-hidden"
    >
      {/* Dreamy background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-rosegold-100/40 blur-[120px] animate-floaty dark:bg-rosegold-100/[0.06]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-softgold-100/40 blur-[120px] animate-floaty-lg dark:bg-softgold-200/[0.05]" />
      </div>

      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Our Forever"
          title="Dreams I want to live with you, inshaAllah"
          subtitle="A small list of beautiful things I’m saving for us"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {DREAMS.map((dream, i) => {
            const Icon = dream.icon
            return (
              <motion.div
                key={dream.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                {/* Floating animation wrapper */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 7 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-full"
                >
                  <div className="relative h-full glass-card p-7 overflow-hidden">
                    {/* Soft gradient halo */}
                    <div
                      className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${dream.palette} opacity-40 blur-3xl group-hover:opacity-70 transition-opacity duration-700`}
                    />

                    {/* Icon */}
                    <div
                      className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${dream.palette} shadow-glow-warm`}
                    >
                      <Icon
                        className="h-6 w-6 text-warmbrown-400"
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="relative heading-serif text-2xl text-warmbrown-400 dark:text-cream-100 mt-6">
                      {dream.title}
                    </h3>
                    <p className="relative mt-3 text-sm sm:text-base leading-relaxed text-warmbrown-300/85 dark:text-cream-200/75">
                      {dream.description}
                    </p>

                    {/* Decorative star */}
                    <span className="absolute bottom-5 right-6 text-rosegold-200/60 group-hover:rotate-180 transition-transform duration-700">
                      ✦
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 text-center"
        >
          <p className="font-script text-3xl sm:text-4xl text-shimmer-rosegold pb-2">
            Bismillah… let’s begin forever.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
