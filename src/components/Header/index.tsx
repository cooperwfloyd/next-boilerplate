import {forwardRef, useEffect} from "react";
import Link from "next/link";
import $ from "jquery";
import Logo from "../../../public/assets/images/logos/logo.svg";

const LogoComponent = forwardRef(function LogoComponent(props, ref: any) {
  return (
    <a aria-label="logo" ref={ref} {...props}>
      <Logo tabIndex={-1}/>
    </a>
  );
});

export const HeaderLogo = () => {
  return (
    <div className="logo">
      <Link href="/" passHref>
        <LogoComponent/>
      </Link>
    </div>
  );
}

export const isOpen = () =>  {
  const html = document.documentElement;
  const hamburgerElements = $(".hamburger-menu");
  const responsiveNavLinks = $(".responsive-nav a, .responsive-nav button");
  
  switch(html.classList.contains("open")) {
    case true:
      html.classList.remove("open");
      hamburgerElements.attr("aria-pressed", "false");
      hamburgerElements.attr("aria-expanded", "false");
      responsiveNavLinks.attr("tabindex", -1);
      break
    case false:
      html.classList.add("open");
      hamburgerElements.attr("aria-pressed", "true");
      hamburgerElements.attr("aria-expanded", "true");
      responsiveNavLinks.attr("tabindex", 0);
      break
    default:
  }
}

export const HamburgerMenu = () => {
  return (
    <button className="hamburger-menu" type="button" aria-label="show main menu" aria-pressed="false" aria-expanded="false" tabIndex={0} onClick={isOpen}>
      <div tabIndex={-1}></div>
      <div tabIndex={-1}></div>
      <div tabIndex={-1}></div>
    </button>
  );
}

const Header = props => {
  useEffect(() => {
    let resizeTimer;

    window.addEventListener("resize", () => {
      document.documentElement.classList.add("resize-transition-stopper");
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        document.documentElement.classList.remove("resize-transition-stopper");
      }, 400);

      const html = document.documentElement;
      html.classList.remove("open");
    });
  });
  
  return (
    <header className="header" id={props.id}>
      <nav>
        <div className="hamburger-container"><HamburgerMenu/></div>
        <HeaderLogo/>
        <ul className="main-nav">
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
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
