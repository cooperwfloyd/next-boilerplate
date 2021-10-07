const withFonts = require("nextjs-fonts");
const domainName = "main.ds41na5e80skr.amplifyapp.com";
const contentDir = "src/content";

module.exports = withFonts({
	env: {
		apiDomainDev: "",
		apiDomainProd: "",
		brandPrimaryColor: "#000000",
		domainName,
		googleAnalyticsID: "",
		orgName: "Next Boilerplate",
		orgNameShort: "Next",
		mdContentDir: `${contentDir}/md/`,
		jsonContentDir: `${contentDir}/json/`
	},
	images: {
		domains: [
			domainName,
		]
	},
	webpack: config => {
    config.module.rules.push(
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
				issuer: {
				 	and: [/\.(js|ts)x?$/]
				}
			},
			{
				test: /\.md$/i,
				use: "raw-loader"
			}
		);

		// !isServer ? config.node = {
		// 	fs: "empty"
		// } : null;
		
		return config;
	},
	poweredByHeader: false,
  // async headers() { // https://nextjs.org/docs/api-reference/next.config.js/headers
  //   return [
  //     {
  //       source: '/',
  //       headers: [
  //         {
  //           key: 'x-header-name',
  //           value: 'header value',
  //         }
  //       ],
  //     },
  //   ]
  // },
  // async redirects() { // https://nextjs.org/docs/api-reference/next.config.js/redirects
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
  // async rewrites() { // https://nextjs.org/docs/api-reference/next.config.js/rewrites
  //   return [
  //     {
  //       source: '/',
  //       destination: '/'
  //     },
  //   ]
  // },
	// i18n: { // https://nextjs.org/docs/advanced-features/i18n-routing
	// 	locales: [
	// 		"en-US"
	// 	],
	// 	defaultLocale: "en-US"
	// }
});
