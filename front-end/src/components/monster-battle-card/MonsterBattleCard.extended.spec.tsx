import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MonsterBattleCard } from "./MonsterBattleCard.extended";

describe("MonsterBattleCard", () => {
  it("renders the monster card correctly with a monster", () => {
    render(<MonsterBattleCard title="Red Dragon" />);
    expect(screen.getByText("Red Dragon")).toBeInTheDocument();
  });

  it("renders nothing when no title is provided", () => {
    const { container } = render(<MonsterBattleCard />);
    expect(container).toHaveTextContent("");
  });
});
