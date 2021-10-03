import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <ul className="footer-nav">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/posts/json/1">Post One</Link>
        </li>
        <li>
          <Link href="/posts/json/2">Post Two</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Cooper Floyd. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
