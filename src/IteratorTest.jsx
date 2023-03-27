import React from "react";
import useIterator from "./useIterator.js";

export const IteratorTest = () => {
  const [userList, current, loading, next, previous] = useIterator(
    "https://randomuser.me/api/"
  );

  return (
    <div>
      <p>
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
      </p>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <p>Current user: {current.fullName}</p>
          <img alt={current.fullName} src={current.image} />
        </div>
      )}
      <button onClick={() => next()}>Next</button>
      <button onClick={() => previous()}>Previous</button>
    </div>
  );
};
