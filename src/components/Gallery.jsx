import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Camera } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

/**
 * Memories Gallery — masonry grid + lightbox.
 *
 * NOTE: Replace each `placeholder` entry's `src` with your real photo paths
 * once you have them. Put files in /public/memories/ and reference them as
 * "/memories/your-photo.jpg". The component will work the same way.
 */
const MEMORIES = [
  {
    id: 1,
    title: 'The Day You Said Yes',
    caption: 'Our first quiet promise to Allah',
    palette: 'from-rosegold-100 via-cream-200 to-rosegold-200',
    tall: true,
    placeholder: '/memories/01.jpg', // replace
  },
  {
    id: 2,
    title: 'Henna Night',
    caption: 'Laughter that I will remember forever',
    palette: 'from-softgold-100 via-cream-100 to-rosegold-100',
    placeholder: '/memories/02.jpg',
  },
  {
    id: 3,
    title: 'Nikah Ceremony',
    caption: 'Three sacred words. One forever.',
    palette: 'from-cream-100 via-rosegold-100 to-rosegold-200',
    tall: true,
    placeholder: '/memories/03.jpg',
  },
  {
    id: 4,
    title: 'First Walima',
    caption: 'Surrounded by every dua we needed',
    palette: 'from-beige-100 via-cream-200 to-softgold-100',
    placeholder: '/memories/04.jpg',
  },
  {
    id: 5,
    title: 'Quiet Morning',
    caption: 'Our first coffee as husband and wife',
    palette: 'from-rosegold-100 via-cream-100 to-beige-100',
    placeholder: '/memories/05.jpg',
  },
  {
    id: 6,
    title: 'Under the Moonlight',
    caption: 'The night sky finally felt complete',
    palette: 'from-warmbrown-50 via-cream-100 to-rosegold-100',
    tall: true,
    placeholder: '/memories/06.jpg',
  },
  {
    id: 7,
    title: 'Hand in Hand',
    caption: 'A promise written without words',
    palette: 'from-softgold-100 via-rosegold-100 to-cream-200',
    placeholder: '/memories/07.jpg',
  },
  {
    id: 8,
    title: 'Praying Side by Side',
    caption: 'The most beautiful sound — two hearts in sujood',
    palette: 'from-cream-100 via-beige-100 to-rosegold-100',
    placeholder: '/memories/08.jpg',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section
      id="memories"
      className="section-pad relative isolate bg-cream-50 dark:bg-nightblue-900 overflow-hidden"
    >
      {/* Decorative arabesque */}
      <div className="absolute inset-0 arabesque-bg opacity-20 dark:opacity-[0.08]" />

      {/* Soft ambient blobs in dark mode for depth */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-rosegold-100/[0.05] blur-[120px]" />
        <div className="absolute bottom-20 left-1/4 h-96 w-96 rounded-full bg-softgold-200/[0.04] blur-[120px]" />
      </div>

      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Memories"
          title="Every memory with you became a piece of Jannah in my heart."
          subtitle="A small collection of the moments I hold close"
        />

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] mt-16">
          {MEMORIES.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => setLightbox(m)}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: (i % 6) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className={`group relative w-full mb-6 break-inside-avoid overflow-hidden rounded-3xl shadow-luxury cursor-pointer text-left
                ${m.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
            >
              <MemoryThumb memory={m} />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-warmbrown-500/85 via-warmbrown-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Zoom hint */}
              <div className="absolute top-4 right-4 h-9 w-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <ZoomIn className="h-4 w-4 text-warmbrown-400" />
              </div>

              {/* Caption */}
              <div className="absolute inset-x-5 bottom-5 text-cream-50 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-serif text-xl drop-shadow">{m.title}</p>
                <p className="font-script text-base text-rosegold-100 mt-0.5">
                  {m.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-warmbrown-500/85 backdrop-blur-2xl p-6"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-11 w-11 rounded-full glass flex items-center justify-center text-cream-50 hover:bg-white/20 transition-all"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-[4/3] rounded-3xl overflow-hidden shadow-paper"
            >
              <MemoryThumb memory={lightbox} large />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-warmbrown-500/90 to-transparent">
                <p className="font-serif text-3xl text-cream-50">
                  {lightbox.title}
                </p>
                <p className="font-script text-xl text-rosegold-100 mt-1">
                  {lightbox.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/**
 * Renders a memory thumbnail.
 * If a real image is available at memory.placeholder, use it.
 * Otherwise, render an elegant gradient + decorative pattern.
 */
function MemoryThumb({ memory, large = false }) {
  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${memory.palette}`}>
      {/* Try the real image; if not available, the gradient + pattern below shows through */}
      <img
        src={memory.placeholder}
        alt={memory.title}
        loading="lazy"
        onError={(e) => {
          // Hide broken images so the gradient placeholder remains beautiful
          e.currentTarget.style.display = 'none'
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
      />

      {/* Decorative arabesque pattern */}
      <div className="absolute inset-0 arabesque-bg opacity-25" />

      {/* Decorative camera icon as a subtle hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`flex flex-col items-center gap-2 text-warmbrown-300/40 dark:text-warmbrown-300/70 ${
            large ? 'scale-150' : ''
          }`}
        >
          <Camera className="h-7 w-7" strokeWidth={1.2} />
          <span className="font-serif text-xs uppercase tracking-[0.3em]">
            {memory.title}
          </span>
        </div>
      </div>

      {/* Soft inner sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/15" />
    </div>
  )
}
