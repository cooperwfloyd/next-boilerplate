const withFonts = require("nextjs-fonts");
const withSass = require("@zeit/next-sass");
const domainName = "main.ds41na5e80skr.amplifyapp.com";
const contentDir = "src/content";

module.exports = withFonts(withSass({
	env: {
		analytics: {
			googleAnalyticsID: "",
		},
		api: {
			devDomain: "",
			prodDomain: ""
		},
		domainName,
		brandPrimaryColor: "#000000",
		orgName: "Next Boilerplate",
		orgNameShort: "Next",
		socials: [
			{
				name: "facebook",
				url: "https://facebook.com"
			},
			{
				name: "instagram",
				url: "https://instagram.com",
				apiUrl: "",
				apiAccessToken: ""
			},
			{
				name: "linkedin",
				url: "https://linkedin.com"
			},
			{
				name: "youtube",
				url: "https://youtube.com"
			}
		],
		mdContentDir: `${contentDir}/md/`,
		jsonContentDir: `${contentDir}/json/`
	},
	images: {
		domains: [
			domainName,
		]
	},
	webpack: (config, {isServer}) => {
    config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
			},
			use: ["@svgr/webpack"]
		}, {
			test: /\.md$/i,
			use: 'raw-loader',
		});

		!isServer ? config.node = {
			fs: "empty"
		} : null;
		
		return config;
	},
	poweredByHeader: false,
	webpack5: false,
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
}));
