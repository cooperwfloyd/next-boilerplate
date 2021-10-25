import Head from "next/head";

interface MetaImage {
  altText?: string 
  mediaItemUrl: string,
}

interface Meta {
  description?: string;
  featuredImage?: MetaImage,
  follow?: string,
  index?: string,
  ogDescription?: string;
  ogImage?: MetaImage,
  ogTitle?: string,
  ogType?: string,
  title?: string;
  twitterDescription?: string,
  twitterImage?: MetaImage,
  twitterTitle?: string
}

const Meta = ({
    description,
    featuredImage,
    follow,
    index,
    ogDescription,
    ogImage,
    ogTitle,
    ogType,
    title,
    twitterDescription,
    twitterImage,
    twitterTitle
  }: Meta) => {
  return (
    <Head>
      {description ? <meta name="description" content={description}/> : null}
      <meta name="robots" content={`${index || "index"} ${follow || "follow"}`}/>
      {ogDescription || description ? <meta property="og:description" content={ogDescription || description}/> : null}
      {
        ogImage || featuredImage ?
        <>
          <meta property="og:image" content={ogImage.mediaItemUrl || featuredImage.mediaItemUrl}/>
          <meta property="twitter:image" content={(twitterImage && twitterImage.mediaItemUrl) || ogImage.mediaItemUrl || featuredImage.mediaItemUrl}/>
        </>
        : null
      }
      {(ogImage && ogImage.hasOwnProperty("altText")) || (featuredImage && featuredImage.hasOwnProperty("altText")) ? <meta property="twitter:image:alt" content={ogImage.altText || featuredImage.altText}/> : null}
      <meta property="og:title" content={ogTitle || title ? `${ogTitle || title} | ${process.env.orgName}` : process.env.orgName}/>
      <meta property="og:type" content={ogType || "website"}/>
      {twitterDescription || ogDescription || description ? <meta property="twitter:description" content={twitterDescription || ogDescription || description}/> : null}
      {twitterTitle || ogTitle || title ? <meta property="twitter:title" content={`${twitterTitle || ogTitle || title} | ${process.env.orgName}` || process.env.orgName}/> : null}
      <title>{title ? `${title} | ${process.env.orgName}` : process.env.orgName}</title>
    </Head>
  );
}

export default Meta;
