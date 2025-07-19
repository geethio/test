import { API_URL } from "../../constants/env";
import { Battle } from "../../models/interfaces/battle.interface";

const battle = async ({
  monsterPlayerId,
  monsterComputerId,
}: {
  monsterPlayerId: string;
  monsterComputerId: string;
}): Promise<Battle> =>
  await fetch(`${API_URL}/battle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ monsterPlayerId, monsterComputerId }),
  }).then((res) => res.json());

export const MonsterServiceExtended = {
  battle,
};
