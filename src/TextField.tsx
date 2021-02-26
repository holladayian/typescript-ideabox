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
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextNode {
  text: string;
}

export const TextField: React.FC<Props> = ({handleChange}) => {
  const [count, setCount] = React.useState<TextNode>({ text: "hello"});
  const inputRef = React.useRef<HTMLInputElement>(null);

  // setCount({text})

  return (
    <div>
      <input ref={inputRef} onChange={handleChange}/>
    </div>
  )
}