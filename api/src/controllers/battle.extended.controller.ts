import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';

const calculateDamage = (attacker: Monster, defender: Monster): number => {
  return Math.max(attacker.attack - defender.defense, 1);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { monsterPlayerId, monsterComputerId } = req.body;

    if (!monsterPlayerId || !monsterComputerId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Both monster IDs are required.' });
    }

    const [monsterPlayer, monsterComputer] = await Promise.all([
      Monster.query().findById(monsterPlayerId),
      Monster.query().findById(monsterComputerId),
    ]);

    if (!monsterPlayer || !monsterComputer) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'One or both monsters not found.' });
    }

    let first = monsterPlayer;
    let second = monsterComputer;

    if (monsterComputer.speed > monsterPlayer.speed) {
      first = monsterComputer;
      second = monsterPlayer;
    } else if (monsterComputer.speed === monsterPlayer.speed) {
      if (monsterComputer.attack > monsterPlayer.attack) {
        first = monsterComputer;
        second = monsterPlayer;
      }
    }

    let firstHP = first.hp;
    let secondHP = second.hp;

    while (firstHP > 0 && secondHP > 0) {
      secondHP -= calculateDamage(first, second);
      if (secondHP <= 0) break;
      firstHP -= calculateDamage(second, first);
    }

    const winner = firstHP > 0 ? first : second;

    await Battle.query().insert({
      monsterA: monsterPlayer,
      monsterB: monsterComputer,
      winner,
    });

    return res.status(StatusCodes.OK).json({ winner });

  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong.' });
  }
};

export const BattleExtendedController = {
  create,
};