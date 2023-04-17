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
      <div className="grid grid-cols-6 grid-rows-2 h-screen">
            <div className=" bg-black/90 row-start-1 row-end-3 col-start-1 col-end-2">
               <Sidebar />
            </div>
            <div className="bg-black/95 row-start-1 row-end-3 col-start-2 col-end-7">
                {children}
            </div>
         </div>
      </body>
    </html>
  )
}
