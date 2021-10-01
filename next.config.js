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
			prodDomain: "",
			path: ""
		},
		domainName: "main.ds41na5e80skr.amplifyapp.com",
		orgName: "Next Boilerplate",
		socials: {
			facebook: {
				url: ""
			},
			instagram: {
				url: "",
				apiUrl: "",
				apiAccessToken: ""
			},
			youtube: {
				url: ""
			},
			linkedin: {
				url: ""
			},
		},
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
		});

		!isServer ? config.node = {
			fs: "empty"
		} : null;
		
		return config;
	},
	webpack5: false
}));