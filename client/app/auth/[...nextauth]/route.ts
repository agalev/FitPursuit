import NextAuth from 'next-auth'
import StravaProvider from 'next-auth/providers/strava'

const handler = NextAuth({
	providers: [
		StravaProvider({
			clientId: process.env.STRAVA_CLIENT_ID,
			clientSecret: process.env.STRAVA_CLIENT_SECRET,
			authorization:
				'https://www.strava.com/oauth/authorize?approval_prompt=force&scope=activity:read_all,profile:read_all'
		})
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url
			return baseUrl
		},
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token
				token.refreshToken = account.refresh_token
				token.profile = account.athlete
			}
			return token
		},
		async session({ session, token }: any) {
			if (session?.user) {
				session.profile = token.profile
			}
			session.accessToken = token.accessToken
			session.refreshToken = token.refreshToken
			return session
		}
	}
})

export { handler as GET, handler as POST }
