/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://127.0.0.1:5555/api/:path*' // Proxy to Backend
			}
		]
	}
}

module.exports = nextConfig
