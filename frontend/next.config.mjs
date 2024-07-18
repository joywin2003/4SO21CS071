/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
        {
          source: '/api/:path*',
          destination: 'http://20.244.56.144/test/:path*', 
        },
      ]
    },
  }
export default nextConfig