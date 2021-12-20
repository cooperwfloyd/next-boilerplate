module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:no-pwa',
    },
    collect: {
      staticDistDir: './.next'
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
