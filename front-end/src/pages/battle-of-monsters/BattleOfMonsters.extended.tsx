import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard.extended";
import { MonstersList } from "../../components/monsters-list/MonstersList.extended";
import { Title } from "../../components/title/Title";
import { fetchMonstersData } from "../../reducers/monsters/monsters.actions";
import {
  selectMonsters,
  selectSelectedMonster,
} from "../../reducers/monsters/monsters.selectors";
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from "./BattleOfMonsters.extended.styled";

import { Monster } from "../../models/interfaces/monster.interface";
import { WinnerDisplay } from "../../components/winner-display/WinnerDisplay";
import { MonsterServiceExtended } from "../../reducers/monsters/monsters.service.extended";
import { Battle } from "../../models/interfaces/battle.interface";

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  const [computerMonster, setComputerMonster] = useState<Monster | null>(null);
  const [winner, setWinner] = useState<Battle | null>(null);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  const handleStartBattleClick = async () => {
    if (!selectedMonster || monsters.length < 2) return;

    // Pick random different monster
    const otherMonsters = monsters.filter((m) => m.id !== selectedMonster.id);
    const randomOpponent =
      otherMonsters[Math.floor(Math.random() * otherMonsters.length)];
    setComputerMonster(randomOpponent);

    const result = await MonsterServiceExtended.battle({
      monsterPlayerId: selectedMonster.id,
      monsterComputerId: randomOpponent.id,
    });

    setWinner(result);
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {winner && <WinnerDisplay text={winner.winner.name} />}

      <BattleSection>
        <MonsterBattleCard
          monster={selectedMonster}
          title={selectedMonster?.name || "Player"}
        ></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}
        >
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          monster={computerMonster}
          title={computerMonster?.name || "Computer"}
        />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
