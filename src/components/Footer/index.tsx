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
          <Link href="/posts/1">Post One</Link>
        </li>
        <li>
          <Link href="/posts/2">Post Two</Link>
        </li>
      </ul>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} {process.env.orgName}. All Rights Reserved. <Link href="/privacy/">Privacy Policy</Link></p>
      </div>
    </footer>
  );
}

export default Footer;
