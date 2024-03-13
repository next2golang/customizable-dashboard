import { PrismaAdapter } from '@auth/prisma-adapter';
import { ethers } from 'ethers';
import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type NextAuthOptions,
  type RequestInternal,
} from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from '~/server/db';

// Authorization function for crypto login
//  takes publicAdress and signature from credentials and returns
//  either a user object on success or null on failure
async function authorizeCrypto(
  credentials: Record<"walletAddress" | "signedNonce", string> | undefined,
  req: Pick<RequestInternal, "body" | "headers" | "method" | "query">
) {
  if (!credentials) return null;

  const { walletAddress, signedNonce } = credentials;

  // Get user from database with their generated nonce
  const user = await db.user.findUnique({
    where: { walletAddress },
    include: { CryptoLoginNonce: true },
  });

  if (!user?.CryptoLoginNonce) return null;

  // Compute the signer address from the saved nonce and the received signature
  const signerAddress = ethers.verifyMessage(
    user.CryptoLoginNonce.nonce,
    signedNonce
  );


  // Check that the signer address matches the public address
  //  that is trying to sign in
  if (signerAddress !== walletAddress) return null;

  // Check that the nonce is not expired
  if (user.CryptoLoginNonce.expires < new Date()) return null;

  // Everything is fine, clear the nonce and return the user
  await db.cryptoLoginNonce.delete({ where: { userId: user.id } });

  return {
    id: user.id,
    publicAddress: user.walletAddress,
  };
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db) as Adapter,
  secret: "DO_NOT_USE_THIS_IN_PROD",
  providers: [
    CredentialsProvider({
      id: "crypto",
      name: "Crypto Wallet Auth",
      credentials: {
        walletAddress: { label: "Wallet Address", type: "text" },
        signedNonce: { label: "Signed Nonce", type: "text" },
      },
      authorize: authorizeCrypto,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
