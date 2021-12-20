module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
      ],
      'numberOfRuns': 3
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
