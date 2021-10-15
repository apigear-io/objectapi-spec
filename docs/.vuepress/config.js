module.exports = {
  base: '/objectapi-spec',
  title: 'ObjectAPI',
  description: 'Create the future of API driven architectures',
  themeConfig: {
    sidebarDepth: 3,
    nav: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/intro' },
          { text: 'Tutorial', link: '/guide/tutorial' },
          { text: 'Specification', link: '/guide/specification' }
        ]
      },
      {
        text: 'Tools',
        items: [{ text: 'Generator', link: '/tools/generator' }]
      },
      { text: 'Community', link: '/community/' }
    ],
    sidebar: {
      '/guide/': ['intro', 'tutorial', 'specification'],
      '/tools/': ['generator']
    }
  }
}
