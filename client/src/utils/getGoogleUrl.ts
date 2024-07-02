const getGoogleOAuthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URL as string,
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const queryString = new URLSearchParams(options);

  return `${rootUrl}?${queryString.toString()}`;
};

export default getGoogleOAuthUrl;
