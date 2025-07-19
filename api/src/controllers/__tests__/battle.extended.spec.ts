import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import factories from '../../factories';
import { Monster } from '../../models';

const server = app.listen();

afterAll(() => server.close());

describe('BattleExtendedController', () => {

    describe('Battle', () => {
        test('should fail when trying a battle of monsters with an undefined monster', async () => {
            const res = await request(server).post('/battle').send({
                monsterPlayerId: null,
                monsterComputerId: null,
            });

            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            expect(res.body.error).toBe('Both monster IDs are required.');
        });

        test('should fail when trying a battle of monsters with an inexistent monster', async () => {
            const res = await request(server).post('/battle').send({
                monsterPlayerId: 9999,
                monsterComputerId: 8888,
            });

            expect(res.status).toBe(StatusCodes.NOT_FOUND);
            expect(res.body.error).toBe('One or both monsters not found.');
        });

        test('should insert a battle of monsters successfully with monster 1 winning', async () => {
            const monster1 = await Monster.query().insert(
                factories.monster.build({ speed: 20, attack: 15, defense: 5, hp: 50 })
            );
            const monster2 = await Monster.query().insert(
                factories.monster.build({ speed: 5, attack: 5, defense: 3, hp: 30 })
            );

            const res = await request(server).post('/battle').send({
                monsterPlayerId: monster1.id,
                monsterComputerId: monster2.id,
            });

            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body.winner.id).toBe(monster1.id);
        });

        test('should insert a battle of monsters successfully with monster 2 winning', async () => {
            const monster1 = await Monster.query().insert(
                factories.monster.build({ speed: 5, attack: 5, defense: 3, hp: 30 })
            );
            const monster2 = await Monster.query().insert(
                factories.monster.build({ speed: 20, attack: 15, defense: 5, hp: 50 })
            );

            const res = await request(server).post('/battle').send({
                monsterPlayerId: monster1.id,
                monsterComputerId: monster2.id,
            });

            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body.winner.id).toBe(monster2.id);
        });
    });
});
