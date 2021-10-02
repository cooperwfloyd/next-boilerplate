import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <ul className="footer-nav">
        <li>
          <Link href="/">Lorem</Link>
        </li>
        <li>
          <Link href="/">Ipsum</Link>
        </li>
        <li>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">Dolor</a>
        </li>
        <li>
          <Link href="/">Sit</Link>
        </li>
        <li>
          <Link href="/">Amet</Link>
        </li>
      </ul>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} {process.env.orgName}. All Rights Reserved. <Link href="/privacy/">Privacy Policy</Link></p>
      </div>
    </footer>
  );
}

export default Footer;
