import { LinearProgress, Typography } from "@mui/material";
import React from "react";
import { Monster } from "../../models/interfaces/monster.interface";
import { Image } from "../monsters-list/MonstersList.styled";
import {
  BattleMonsterCard,
  BattleMonsterTitle,
} from "./MonsterBattleCard.extended.styled";

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  if (monster?.imageUrl) {
    return (
      <>
        {
          <BattleMonsterCard>
            <Image src={monster?.imageUrl} width={100} />
            <BattleMonsterTitle>{title!}</BattleMonsterTitle>

            <LinearProgress
              variant="determinate"
              value={monster?.attack}
              sx={{ width: "80%", float: "left" }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ width: "10%", float: "left" }}
            >
              {monster?.attack}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={monster?.defense}
              sx={{ margintop: "100px", width: "80%", float: "left" }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ width: "10%", float: "left" }}
            >
              {monster?.defense}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={monster?.speed}
              sx={{ margintop: "100px", width: "80%", float: "left" }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ width: "10%", float: "left" }}
            >
              {monster?.speed}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={monster?.hp}
              sx={{ margintop: "100px", width: "80%", float: "left" }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ width: "10%", float: "left" }}
            >
              {monster?.hp}
            </Typography>
          </BattleMonsterCard>
        }
      </>
    );
  } else {
    return (
      <BattleMonsterCard>
        <BattleMonsterTitle>{title!}</BattleMonsterTitle>
      </BattleMonsterCard>
    );
  }
};

export { MonsterBattleCard };
