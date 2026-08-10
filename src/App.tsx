import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'

// Placeholder sections so the nav links and scrolling can be tested.
// Each one gets replaced by a real component in build order:
// Hero, About, Skills, Projects, Contact.
const placeholders = [
  { id: 'about', label: 'About' },
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

        {placeholders.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-[60svh] items-center border-t border-line"
          >
            <h2 className="text-2xl font-semibold text-heading">
              {section.label}
            </h2>
          </section>
        ))}
      </main>

      <Footer />
    </>
  )
}

export default App
