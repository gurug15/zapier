/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_HOOKS_URL: process.env.NEXT_PUBLIC_HOOKS_URL,
  },
};

export default nextConfig;
