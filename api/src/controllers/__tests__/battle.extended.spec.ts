import app from '../../app';

const server = app.listen();

afterAll(() => server.close());

describe('BattleExtendedController', () => {

    describe('Battle', () => {
        test('should fail when trying a battle of monsters with an undefined monster', async () => {
            // @TODO
            expect(true).toBe(false);
        });

        test('should fail when trying a battle of monsters with an inexistent monster', async () => {
            // @TODO
            expect(true).toBe(false);
        });

        test('should insert a battle of monsters successfully with monster 1 winning', async () => {
            // @TODO
            expect(true).toBe(false);
        });

        test('should insert a battle of monsters successfully with monster 2 winning', async () => {
            // @TODO
            expect(true).toBe(false);
        });
    });
});
