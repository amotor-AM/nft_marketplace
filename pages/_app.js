import '../styles/globals.css'
import Link from "next/link"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6"/>
      <Component {...pageProps} />
    </div>
    
  )
}

export default MyApp
