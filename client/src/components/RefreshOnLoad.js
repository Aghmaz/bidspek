import { useEffect, useRef, useState } from "react";

export default function RefreshOnLoad() {
  //   useEffect(() => {
  //     if (!window.location.hash) {
  //       window.location = window.location + "#loaded";
  //       window.location.reload();
  //     }
  //   }, []);

  //   return null;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      window.location.reload();
    }
  }, [isMounted]);

  return null;
}
