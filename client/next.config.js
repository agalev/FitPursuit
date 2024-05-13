/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://v0ww4ks.ironforgesoftware.com/api/:path*' // Proxy to Backend
			}
		]
	}
}

module.exports = nextConfig
