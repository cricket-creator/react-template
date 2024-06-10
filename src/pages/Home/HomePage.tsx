import { Button } from "components/Button";
import { FC, useState } from "react";

const HomePage: FC = () => {
  const [text, setText] = useState<string>();

  const changeText = () => {
    setText((prev) => {
      return prev ? undefined : "Click me";
    });
  };

  return (
    <>
      <h1>Home page</h1>
      <Button onClick={changeText}>{text}</Button>
    </>
  );
};

export default HomePage;
