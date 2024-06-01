import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
            protocol : "https",
            hostname: "jyotideep-dev.s3.ap-south-1.amazonaws.com"
            }
        ]
    }
};

export default nextConfig;
