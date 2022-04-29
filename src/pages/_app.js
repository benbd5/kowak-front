import { ThemeProvider } from 'next-themes'
import 'tailwindcss/tailwind.css'
import './../../styles/global.css'

// const App = ({ Component, pageProps }) => <Component {...pageProps} />
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default App
