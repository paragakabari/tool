module.exports = {
    reactStrictMode: true,
    swcMinify: false,
    images: {
      loader: "imgix",
      path: "",
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    devIndicators: {
      buildActivity: false,
  }
  };
  