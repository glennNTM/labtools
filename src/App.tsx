import type { ComponentType } from 'react'
import { useConsent } from '@/lib/consent'
import { usePathname } from '@/lib/router'
import { Analytics } from '@/components/layout/Analytics'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SkipLink } from '@/components/layout/SkipLink'
import { Confidentialite } from '@/pages/Confidentialite'
import { Cookies } from '@/pages/Cookies'
import { Home } from '@/pages/Home'
import { MentionsLegales } from '@/pages/MentionsLegales'
import { NotFound } from '@/pages/NotFound'

const routes: Record<string, ComponentType> = {
  '/': Home,
  '/mentions-legales': MentionsLegales,
  '/confidentialite': Confidentialite,
  '/cookies': Cookies,
}

function App() {
  const pathname = usePathname()
  const Page = routes[pathname] ?? NotFound
  const { consent } = useConsent()

  return (
    <>
      <SkipLink />
      <CookieBanner />
      <Navbar />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Page key={pathname} />
      </main>
      <Footer />
      {consent?.analytics && <Analytics />}
    </>
  )
}

export default App
