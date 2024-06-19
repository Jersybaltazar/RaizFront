/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['res.cloudinary.com','randomuser.me'],
    },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://raizback.onrender.com/api/:path*',
          },
        ];
      },
};

export default nextConfig;
