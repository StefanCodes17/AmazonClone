const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  
]

module.exports = {
  images:{
    domains: ["links.papareact.com", "fakestoreapi.com", "upload.wikimedia.org"],
  },
  env:{
    stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  reactStrictMode: true,
  async headers(){
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  }
}
