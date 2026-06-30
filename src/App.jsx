import './App.css'
import Navbar from './components/Navbar'
import MenuOverlay from './components/MenuOverlay'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Products from './components/Products'
import Method from './components/Method'
import Trust from './components/Trust'
import Faq from './components/Faq'
import Contact from './components/Contact'
import PreFooter from './components/PreFooter'
import Footer from './components/Footer'
import VerifyModal from './components/VerifyModal'
import RibbonCanvas from './components/RibbonCanvas'
import { ThemeProvider } from './context/ThemeContext'
import { UIProvider } from './context/UIContext'

export default function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <RibbonCanvas />
        <Navbar />
        <MenuOverlay />
        <main>
          <Hero />
          <About />
          <Work />
          <Products />
          <Method />
          <Trust />
          <Faq />
          <Contact />
        </main>
        <PreFooter />
        <Footer />
        <VerifyModal />
      </UIProvider>
    </ThemeProvider>
  )
}
