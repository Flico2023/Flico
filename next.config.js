/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname: "img-lcwaikiki.mncdn.com",
      port:"",
      pathname: "/mnresize/**"
    }]
  }
}

//https://img-lcwaikiki.mncdn.com/mnresize/1020/1360/pim/productimages/20201/4053185/v1/l_20201-0sa741z8-cvl-86-61-91-175_5.jpg

module.exports = nextConfig
