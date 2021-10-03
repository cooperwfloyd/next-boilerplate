import Head from "next/head";

interface Meta {
  title?: string;
  description?: string;
  ogDescription?: string;
}

const Meta = ({title, description, ogDescription}: Meta) => {
  return (
    <Head>
      <title>{title ? `${title} | ${process.env.orgName}` : process.env.orgName}</title>
      <meta name="description" content={description}/>
      <meta property="og:description" content={ogDescription ? ogDescription : description}/>
    </Head>
  );
}

export default Meta;
