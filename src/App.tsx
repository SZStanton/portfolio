import { Navbar } from './components/layout/Navbar'

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
        <section id="home" className="flex min-h-[70svh] flex-col justify-center">
          <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
            New portfolio in the works
          </h1>
          <p className="mt-4 text-lg">Still putting it together — worth a look back soon.</p>
        </section>

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
    </>
  )
}

export default App
