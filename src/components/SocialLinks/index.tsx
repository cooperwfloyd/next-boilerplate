import socials from "../../content/socials.json";

const SocialLinks = () => {
  return (
    <>
      {socials.twitter.url && socials.twitter.name ? <li><a href={socials.twitter.url} target="_blank" rel="noopener noreferrer" aria-label={socials.twitter.name}><span tabIndex={-1}></span></a></li> : null}
      {socials.facebook.url && socials.facebook.name ? <li><a href={socials.facebook.url} target="_blank" rel="noopener noreferrer" aria-label={socials.facebook.name}><span tabIndex={-1}></span></a></li> : null}
      {socials.linkedin.url && socials.linkedin.name ? <li><a href={socials.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label={socials.linkedin.name}><span tabIndex={-1}></span></a></li> : null}
      {socials.instagram.url && socials.instagram.name ? <li><a href={socials.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={socials.instagram.name}><span tabIndex={-1}></span></a></li> : null}
      {socials.youtube.url && socials.youtube.name ? <li><a href={socials.youtube.url} target="_blank" rel="noopener noreferrer" aria-label={socials.youtube.name}><span tabIndex={-1}></span></a></li> : null}
    </>
  );
}

export default SocialLinks;
