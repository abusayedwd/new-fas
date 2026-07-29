import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Feather, Trash2 } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'af-love-notes-v1'
const AUTHORS = ['Fariha', 'Abu Sayed']

const DEFAULT_NOTES = [
  {
    id: 'seed-1',
    author: 'Abu Sayed',
    text: 'Every morning I thank Allah twice — once for waking me up, and once for making you mine.',
    date: '15 May 2026',
  },
  {
    id: 'seed-2',
    author: 'Abu Sayed',
    text: 'If you ever feel far from me, come back to this page. I left a piece of my heart in every corner of it.',
    date: '15 May 2026',
  },
  {
    id: 'seed-3',
    author: 'Abu Sayed',
    text: 'This little board is yours now. Leave a note here anytime — I will read every single one, always.',
    date: '15 May 2026',
  },
]

function loadNotes() {
  if (typeof window === 'undefined') return DEFAULT_NOTES
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_NOTES
  } catch {
    return DEFAULT_NOTES
  }
}

export default function LoveNotes() {
  const [notes, setNotes] = useState(loadNotes)
  const [author, setAuthor] = useState('Fariha')
  const [text, setText] = useState('')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const addNote = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    const note = {
      id: `n-${Date.now()}`,
      author,
      text: trimmed,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }
    setNotes((prev) => [note, ...prev])
    setText('')
  }

  const removeNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id))

  return (
    <section
      id="notes"
      className="section-pad relative isolate overflow-hidden bg-cream-100/60 dark:bg-nightblue-800/60"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-rosegold-100/30 blur-[130px] dark:bg-rosegold-100/[0.05]" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-softgold-100/30 blur-[130px] dark:bg-softgold-200/[0.05]" />
      </div>

      <div className="container-luxury relative">
        <SectionHeading
          eyebrow="Our Little Diary"
          title="Notes We Leave For Each Other"
          subtitle="Small words, kept safe here, forever"
        />

        {/* Composer */}
        <motion.form
          onSubmit={addNote}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-6 sm:p-8 max-w-2xl mx-auto mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            {AUTHORS.map((name) => (
              <button
                type="button"
                key={name}
                onClick={() => setAuthor(name)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300',
                  author === name
                    ? 'bg-gradient-to-br from-rosegold-200 via-rosegold-300 to-rosegold-400 text-white shadow-glow-warm'
                    : 'glass text-warmbrown-400 dark:text-cream-100'
                )}
              >
                {name}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            maxLength={280}
            placeholder="Write a little note for your beloved..."
            className="w-full resize-none rounded-2xl bg-white/60 dark:bg-white/[0.06] border border-rosegold-200/40 dark:border-rosegold-100/15 p-4 font-serif text-warmbrown-400 dark:text-cream-100 placeholder:text-warmbrown-300/50 dark:placeholder:text-cream-200/40 focus:outline-none focus:ring-2 focus:ring-rosegold-200/60 transition-shadow"
          />

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-luxury">
              <Feather className="h-4 w-4" />
              Seal with a heart
            </button>
          </div>
        </motion.form>

        {/* Notes grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence initial={false}>
            {notes.map((note, i) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative glass-card p-6 sm:p-7"
              >
                <button
                  onClick={() => removeNote(note.id)}
                  aria-label="Remove note"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-warmbrown-300/70 hover:text-rosegold-400 dark:text-cream-200/50 dark:hover:text-rosegold-100 transition-all duration-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <Heart
                  className="h-4 w-4 text-rosegold-300 mb-4"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <p className="font-serif text-warmbrown-400 dark:text-cream-100 leading-relaxed">
                  {note.text}
                </p>
                <p className="mt-5 text-xs uppercase tracking-[0.25em] text-rosegold-300">
                  {note.author} · {note.date}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {notes.length === 0 && (
          <p className="text-center font-script text-2xl text-rosegold-300 mt-10">
            Write the very first note above…
          </p>
        )}
      </div>
    </section>
  )
}
