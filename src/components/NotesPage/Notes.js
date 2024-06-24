import React, { useEffect ,useState } from "react";
import NoteFrom from "./NoteFrom";
import ShowNotes from "./ShowNotes";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [auth, setauth] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    } else {
      setauth(true);
    }
    /* eslint-disable */
  }, []);

  return (
    <>
      {auth && (
        <>
          <NoteFrom />
          {/* show note contain the funcationality of the delete and the edit note */}
          <ShowNotes />
        </>
      )}
    </>
  );
}
