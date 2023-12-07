import { Button, Title } from "components";
import { MouseEventHandler } from "react";
import { useBlueColor, useOnline } from "hooks";

const App = () => {
  const isOnline = useOnline();
  const { isBlue, toggleIsBlue } = useBlueColor();

  const toggle: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    toggleIsBlue();
  };

  return (
    <>
      {isOnline ? "Connected" : "Disconnected"}
      <Title isBlue={isBlue}>My {APPLICATION}</Title>
      <Button type="button" onClick={toggle} isBlue={isBlue}>
        Button
      </Button>
    </>
  );
};

export default App;
