import { useState, useEffect } from "react";

import { getCenterBoard} from "../../services/user.service";

const BoardCenter = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getCenterBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardCenter;