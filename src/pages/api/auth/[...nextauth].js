import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import service from "public/service.json";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default NextAuth({
  session: {
    strategy: "jwt",
    cookieName: service.next_auth_cookie_name,
  },

  cookies: {
    sessionToken: {
      name: service.next_auth_session_name,
      options: {
        httpOnly: true, // 브라우저에서 실행되는 JavaScript가 쿠키에 접근하는 것을 막아, 크로스 사이트 스크립팅(XSS) 공격에 대한 보안을 강화
        sameSite: "lax", // 쿠키가 전송되는 시점을 제어 'lax'로 설정하는 것이 일반적으로 좋은 기본값
        path: "/", // 쿠키가 유효한 URL 경로를 정의
        secure: process.env.NODE_ENV === "production", // 쿠키가 HTTPS를 통해서만 전송되도록 하여, 보안을 위해 생산 환경에서는 항상 true로
      },
    },
  },

  // session: { jwt: true },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
          const result = await axios.post(
            `${SERVER_BASE_URL}/accounts/login/`,
            { email, password }
          );

          if (result.status === 200)
            return { status: "success", data: result.data };
          else return null;
        } catch (e) {
          throw new Error(e.response.data.message);
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      // console.log('jwt 콜백', token, user);
      if (!!user) {
        token.accessToken = user.data.access;
        token.refreshToken = user.data.refresh;
        token.user = { username: user.data.username, email: user.data.email };
        token.accessTokenExpiresIn = user.data.accessTokenExpiresIn;
        token.refreshTokenExpiresIn = user.data.refreshTokenExpiresIn;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // console.log("세션 콜백", session, token);
      session.status = "success";
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      session.accessTokenExpiresIn = token.accessTokenExpiresIn;
      session.refreshTokenExpiresIn = token.refreshTokenExpiresIn;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
