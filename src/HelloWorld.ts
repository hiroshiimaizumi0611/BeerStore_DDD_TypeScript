export const HelloWorld = (name: string): string => {
  const res = `Hello ${name}!`;
  console.log(res);
  return res;
};

HelloWorld("World");
