const request = require('supertest');
const app = require('../../src/app');
const connectio = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connectio.migrate.rollback();
        await connectio.migrate.latest();
    });

    afterAll(async () => {
        await connectio.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
                name: "APAD 2",
                email: "contato@apad.com.br",
                whatsapp: "4700000000",
                city: "Rio do Sul",
                uf: "SC"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});