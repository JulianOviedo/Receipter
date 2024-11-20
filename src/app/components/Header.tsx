import Image from 'next/image'
import Link from 'next/link'

interface Props {
  logo?: string
  company?: string
}

const NAV_LINKS = [
  {
    link: 'Employees',
    path: '/employees'
  }

]

const Header: React.FC<Props> = ({ logo, company = 'Test' }) => {
  return (
    <header className="flex justify-between items-center p-3 px-4 shadow-xl">
      {logo
        ? (
        <div className="relative w-11 h-11">
          <Image src={logo} fill alt="logo" />
        </div>
          )
        : (
        <span>Logo Img</span>
          )}

       <Link href="/">{company}</Link>

        <nav>
            {NAV_LINKS.map(({ link, path }) => (
                <Link href={path}>{link}</Link>
            ))}
        </nav>
    </header>
  )
}

export default Header
