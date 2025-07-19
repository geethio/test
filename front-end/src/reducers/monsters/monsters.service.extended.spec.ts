import { MonsterServiceExtended } from "./monsters.service.extended";
import { API_URL } from "../../constants/env";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

describe("Monsters Service Extended", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should get the winner of the battle of monsters", async () => {
    const mockResponse = {
      winner: {
        id: "1",
        name: "Dragon",
        attack: 90,
        defense: 80,
        hp: 100,
        speed: 75,
        type: "Fire",
        imageUrl: "https://example.com/dragon.jpg",
      },
      tie: false,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await MonsterServiceExtended.battle({
      monsterPlayerId: "1",
      monsterComputerId: "2",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}/battle`,
      expect.objectContaining({
        method: "POST",
      }),
    );

    expect(result.winner).toEqual(mockResponse.winner);
    expect(result.tie).toBe(false);
  });
});
