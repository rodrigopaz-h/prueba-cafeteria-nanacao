const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  // Test para la ruta GET /cafes
  it('Debería devolver un status code 200 y un array con al menos un objeto', async () => {
    const response = await request(server).get('/cafes');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });



  // Test para la ruta DELETE /cafes
  it('Debería devolver un código 404 al intentar eliminar un café inexistente', async () => {
    const idInexistente = 10;
    const response = await request(server)
      .delete(`/cafes/${idInexistente}`)
      .set('Authorization', 'Bearer token_simulado');
  
    expect(response.status).toBe(404);
  });
  
  

  // Test para la ruta POST /cafes
  it('Debería agregar un nuevo café y devolver un status code 201', async () => {
    const nuevoCafe = { id: 4, nombre: 'Café Mocha' };
    
    const response = await request(server)
      .post('/cafes')
      .send(nuevoCafe);
  
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(nuevoCafe)]));
  });
  
  

  // Test para la ruta PUT /cafes
  it('Debería devolver un status code 400 si los IDs en los parámetros y el payload son diferentes', async () => {
    const idParametro = 1;
    const cafeActualizado = { id: 2, nombre: 'Café Actualizado' };
    
    const response = await request(server)
      .put(`/cafes/${idParametro}`)
      .send(cafeActualizado);
    
    expect(response.status).toBe(400);
  });

});
