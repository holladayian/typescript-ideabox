import React from "react";

interface Person {
  firstName: string;
  lastName: string;
}

interface Props {
  text: string;
  ok?: boolean;
  i?: number;
  fn?: (bob: string) => string;
  person: Person;
}

interface TextNode {
  text: string;
}

export const TextField: React.FC<Props> = () => {
  const [count, setCount] = React.useState<TextNode>({ text: "hello"});

  setCount({text})

  return (
    <div>
      <input />
    </div>
  )
}