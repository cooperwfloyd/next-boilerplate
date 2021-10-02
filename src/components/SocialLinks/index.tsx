const SocialLinks = () => {
  return (
    <>
      {process.env.instagramUrl ? <li><a href={process.env.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="instagram"><span tabIndex={-1}></span></a></li> : null}
      {process.env.linkedinUrl ? <li><a href={process.env.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="linkedin"><span tabIndex={-1}></span></a></li> : null}
      {process.env.pinterestUrl ? <li><a href={process.env.pinterestUrl} target="_blank" rel="noopener noreferrer" aria-label="pinterest"><span tabIndex={-1}></span></a></li> : null}
      {process.env.tiktokUrl ? <li><a href={process.env.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="tiktok"><span tabIndex={-1}></span></a></li> : null}
      {process.env.youtubeUrl ? <li><a href={process.env.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="youtube"><span tabIndex={-1}></span></a></li> : null}
      {process.env.facebookUrl ? <li><a href={process.env.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="facebook"><span tabIndex={-1}></span></a></li> : null}
    </>
  );
}

export default SocialLinks;
