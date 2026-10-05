import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { HowItWorks } from './pages/HowItWorks'
import { Menu } from './pages/Menu'
import { Policy } from './pages/Policy'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Prices } from './pages/Prices'
import { Register } from './pages/Register'
import { TermsAndConditions } from './pages/TermsAndConditions'
import { Section } from './ui'

function NotFound() {
  return (
    <Section title="Page not found" subtitle="That page does not exist.">
      <Link to="/" className="font-semibold text-leaf-900 underline">
        Go to the home page
      </Link>
    </Section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="prices" element={<Prices />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="register" element={<Register />} />
          <Route path="cancellation-policy" element={<Policy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
