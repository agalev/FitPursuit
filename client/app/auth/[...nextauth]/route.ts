import NextAuth from 'next-auth'
import StravaProvider from 'next-auth/providers/strava'

const handler = NextAuth({
	providers: [
		StravaProvider({
			clientId: process.env.STRAVA_CLIENT_ID,
			clientSecret: process.env.STRAVA_CLIENT_SECRET,
      authorization: 'https://www.strava.com/oauth/authorize?approval_prompt=force&scope=activity:read_all,profile:read_all',
		})
	],

	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token
				token.refreshToken = account.refresh_token
				token.profile = account.athlete
			}
			return token
		},
		async session({ session, token }) {
			if (session?.user) {
				session.profile = token.profile
			}
			session.accessToken = token.accessToken
			session.refreshToken = token.refreshToken
			return session
		},
		async signIn(user, account, profile) {
      // console.log(user.account.expires_at)
			// fetch('http://localhost:3000/api/auth', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	},
			// 	body: JSON.stringify({
			// 		...user.profile,
			// 		accessToken: user.account.access_token,
			// 		refreshToken: user.account.refresh_token,
      //     expires_at: user.account.expires_at
			// 	})
			// })
      // .then(res => res.json())
      // .then(data => console.log(data))

			return true
		}
	}
})

export { handler as GET, handler as POST }
