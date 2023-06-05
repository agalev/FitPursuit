/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://flask-service.2c8kjrairb3la.us-west-2.cs.amazonlightsail.com/api/:path*' // Proxy to Backend
			}
		]
	}
}

module.exports = nextConfig
