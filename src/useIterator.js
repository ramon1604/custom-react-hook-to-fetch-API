import { useEffect, useState, useRef } from "react";

let arrLength = true;

export default function useIterator(url) {
  const [userList, setUserList] = useState([]);
  const [current, setCurrent] = useState([]);
  const [loading, setLoading] = useState(false);

  const addUser = async () => {
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
  };

  useEffect(() => {
    if (arrLength) {
      addUser();
      arrLength = false;
    }
    // eslint-disable-next-line
  }, []);

  const next = () => {
    if (current.id < userList.length - 1) {
      setCurrent(userList[current.id + 1]);
    } else {
      addUser();
    }
  };

  const previous = () => {
    if (current.id > 0) {
      setCurrent(userList[current.id - 1]);
    }
  };

  return [userList, current, loading, next, previous];
}
