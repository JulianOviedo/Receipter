import Link from 'next/link'

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <footer className={`p-5 mt-10 flex justify-center ${className}`}>
      <span>
        Developed and designed by{' '}
        <Link
          href="https://www.linkedin.com/in/julian-oviedo-17b605136/"
          className="text-blue-500 cursor-pointer"
        >
          Julian Oviedo
        </Link>
      </span>
    </footer>
  )
}

export default Footer
