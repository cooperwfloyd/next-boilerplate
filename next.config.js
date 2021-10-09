const withFonts = require("nextjs-fonts");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
				test: /\.svg$/i,
				use: ['@svgr/webpack'],
				issuer: {
				 	and: [/\.(js|ts)x?$/]
				}
			},
			{
				test: /\.md$/i,
				use: "raw-loader"
			},
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
		);

		config.plugins.push(
      new MiniCssExtractPlugin({
        filename: `static/chunks/[name].${Date.now()}.css`,
        chunkFilename: `static/chunks/[name].${Date.now()}.css`
      }),
      new CompressionPlugin({
        test: /\.js$|\.css$|\.html$/i
      })
    );
		
		return config;
	},

  compress: true,
	poweredByHeader: false

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
