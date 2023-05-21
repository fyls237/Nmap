const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  },
  session: {
    localStorageItemName: "blog_user_session_jwt",
  },
}

export default config