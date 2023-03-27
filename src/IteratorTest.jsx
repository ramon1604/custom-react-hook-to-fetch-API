import React from "react";
import useIterator from "./useIterator.js";
import "./styles.css"

export const IteratorTest = () => {
  const [userList, current, loading, next, previous] = useIterator(
    "https://randomuser.me/api/"
  );

  return (
    <div style={{ borderStyle: "solid" }}>
      <h3>
        ReactJS Custom Hook to Fetch API
      </h3>
      <div>
        All users:{` `}
        {userList.map((user) =>
          user.fullName === current.fullName ? (
            <b key={user.id}>
              {user.fullName},{` `}
            </b>
          ) : (
            <span key={user.id}>
              {user.fullName},{` `}
            </span>
          )
        )}
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <div>Current user: {current.fullName}</div>
          <img alt={current.fullName} src={current.image} />
          <br />
          <button onClick={() => next()}>Next</button>
          <button onClick={() => previous()}>Previous</button>
        </div>
      )}
    </div>
  );
};
