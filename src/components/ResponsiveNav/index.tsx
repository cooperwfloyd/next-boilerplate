import Link from "next/link";
import {useEffect} from "react";
import Header, {isOpen} from "../Header";
import SocialLinks from "../SocialLinks";
import $ from "jquery";

const ResponsiveNav = () => {
  useEffect(() => {
    $(".responsive-nav .hamburger-menu").attr("tabindex", -1);

    setInterval(() => {
      const $selector = $(".responsive-nav img.active");
      if($selector.next().length) {
        $selector.next().addClass("active");
      } else {
        $(".responsive-nav img").first().addClass("active");
      }

      setTimeout(() => {
        $selector.toggleClass("active");
      }, 1000);
    }, 4000);
  });

  return (
    <nav className="responsive-nav" id="responsive-nav" aria-label="main menu">
      <section className="nav">
        <Header/>
        <ul className="main-nav">
          <li onClick={isOpen}>
            <Link href="/">
              <a>
                <span tabIndex={-1}>Home</span>
              </a>
            </Link>
          </li>
          <li onClick={isOpen}>
            <Link href="/posts">
              <a>
                <span tabIndex={-1}>Posts</span>
              </a>
            </Link>
          </li>
          <li onClick={isOpen}>
            <Link href="/posts/1">
              <a>
                <span tabIndex={-1}>Post One</span>
              </a>
            </Link>
          </li>
          <li onClick={isOpen}>
            <Link href="/posts/2">
              <a>
                <span tabIndex={-1}>Post Two</span>
              </a>
            </Link>
          </li>
        </ul>
        <ul className="social">
          <SocialLinks/>
        </ul>
      </section>
    </nav>
  );
}

export default ResponsiveNav;
