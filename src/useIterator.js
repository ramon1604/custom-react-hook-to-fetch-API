import { useEffect, useState, useCallback } from "react";

let arrLength = true;

export default function useIterator(url) {
  const [userList, setUserList] = useState([]);
  const [current, setCurrent] = useState([]);
  const [loading, setLoading] = useState(false);

  const addUserCallback = useCallback(() => {
    (
      async () => {
        setLoading(true);
        const add = await fetch(url);
        const res = await add.json();
        const {
          name: { first, last },
          picture: { large }
        } = res.results[0];
        const count = userList.length || 0;
        setUserList([
          ...userList,
          { id: count, fullName: `${first} ${last}`, image: large }
        ]);
        setCurrent({ id: count, fullName: `${first} ${last}`, image: large });
        setLoading(false);
      }
    )()
  }, [url, userList])

  useEffect(() => {
    if (arrLength) {
      addUserCallback();
      arrLength = false;
    }
  }, [addUserCallback]);

  const next = () => {
    if (current.id < userList.length - 1) {
      setCurrent(userList[current.id + 1]);
    } else {
      addUserCallback();
    }
  };

  const previous = () => {
    if (current.id > 0) {
      setCurrent(userList[current.id - 1]);
    }
  };

  const remove = () => {
    if (current.id > 0) {
      const newUserList = userList.filter((curr) => curr.id != current.id)
      setUserList(newUserList.map((curr, id) => {
        curr.id = id;
        return curr
      }))
      setCurrent(userList[current.id - 1]);
      return
    }
    if (userList.length === 1) {
      window.location.reload(false);
    }
  }

  return [userList, current, loading, next, previous, remove];
}
