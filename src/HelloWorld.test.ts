import { HelloWorld } from "HelloWorld";

test("sayHello", () => {
  expect(HelloWorld("World")).toBe("Hello World!");
});
