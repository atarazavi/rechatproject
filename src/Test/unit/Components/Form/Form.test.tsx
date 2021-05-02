import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "Components/Form/Form";
import "@testing-library/jest-dom/extend-expect";

test("Changing value of title input works correctly", () => {
  render(<Form />);
  userEvent.type(screen.getByTestId("titleInput"), "Hello, World!");
  expect(screen.getByTestId("titleInput")).toHaveValue("Hello, World!");
});

test("Changing value of description input works correctly", () => {
  render(<Form />);
  userEvent.type(screen.getByTestId("descriptionInput"), "Hello,{enter}World!");
  expect(screen.getByTestId("descriptionInput")).toHaveValue("Hello,\nWorld!");
});