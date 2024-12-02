interface Config {
  authUrl: string;
  userUrl: string;
  instituicaoUrl: string;
  transacaoUrl: string;
}

function getConfig(): Config {
  if (!process.env.NEXT_PUBLIC_AUTH_URL || !process.env.NEXT_PUBLIC_USER_URL || !process.env.NEXT_PUBLIC_INSTITUICAO_URL || !process.env.NEXT_PUBLIC_TRANSACSO_URL) {
    throw new Error('Missing environment variables for API URLs');
  }

  return {
    transacaoUrl:  process.env.NEXT_PUBLIC_TRANSACSO_URL,
    instituicaoUrl: process.env.NEXT_PUBLIC_INSTITUICAO_URL,
    authUrl: process.env.NEXT_PUBLIC_AUTH_URL,
    userUrl: process.env.NEXT_PUBLIC_USER_URL
  };
}

const config = getConfig();

export default config;
