import { useState, useEffect } from "react";

import { getUserBoard} from "../../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getUserBoard().then(
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
        <h3>{content} User</h3>
      </header>
    </div>
  );
};

export default BoardUser;