import './globals.css'
import Sidebar from './components/Sidebar'

export const metadata = {
  title: 'To-Do App',
  description: 'A simple to-do app built with NextJS, TypeScript, and Tailwind CSS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"> 
      <body>
      <div className="h-screen relative">
            <div id="sidebar" className=" bg-zinc-800 fixed top-0 left-0 bottom-0 w-64">
               <Sidebar />
            </div>
            <div id="main" className="h-full ml-64 relative">
                {children}
            </div>
         </div>
      </body>
    </html>
  )
}
