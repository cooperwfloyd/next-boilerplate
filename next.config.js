const path = require("path");
const withFonts = require("nextjs-fonts");
const withSass = require("@zeit/next-sass");

module.exports = withFonts(withSass({
	env: {
		analytics: {
			googleAnalyticsID: "",
		},
		api: {
			devDomain: "",
			prodDomain: ""
		},
		brandPrimaryColor: "#000000",
		domainName: "main.ds41na5e80skr.amplifyapp.com",
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
	},
	// i18n: { // If internationalization is needed
	// 	locales: [
	// 		"en-US"
	// 	],
	// 	defaultLocale: "en-US"
	// },
	images: {
		domains: [
			"main.ds41na5e80skr.amplifyapp.com",
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
	webpack5: false
}));
