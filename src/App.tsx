import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Hero } from './components/sections/Hero'

// Stand-ins until each real section is built. The ids are what the
// navbar links scroll to.
const placeholders = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        <Hero />
        <About />

        {placeholders.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-[60svh] items-center border-t border-line"
          >
            <h2 className="text-2xl font-semibold text-heading">{section.label}</h2>
          </section>
        ))}
      </main>

      <Footer />
    </>
  )
}

export default App
