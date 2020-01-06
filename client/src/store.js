import React, { useEffect, useState } from "react";
export const userContext = React.createContext();
export const LikesContext = React.createContext();
export const RetweetsContext = React.createContext();

const Store = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [tweetsLikedByUser, setTweetLikedByUsers] = useState("");
  const [UserRetweets, setUserRetweets] = useState("");

  return (
    <RetweetsContext.Provider value={[UserRetweets, setUserRetweets]}>
      <LikesContext.Provider value={[tweetsLikedByUser, setTweetLikedByUsers]}>
        <userContext.Provider value={[userData, setUserData]}>
          {children}
        </userContext.Provider>
      </LikesContext.Provider>
    </RetweetsContext.Provider>
  );
};


export default  Store;