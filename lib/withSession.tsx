import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from 'next'
import User from 'Types/User'

export const sessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'ZOOCOOKIE',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export function withSessionRoute (handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
> (
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions)
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}
