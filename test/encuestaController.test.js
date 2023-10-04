const request = require("supertest");
const app = require("../tu_app"); // Reemplaza "tu_app" con el nombre del archivo principal de tu aplicación

describe("Pruebas del controlador de encuestas", () => {
  it("Debería crear una nueva encuesta", async () => {
    const encuestaData = {
      // aqui escribir los datos de la encuesta
      /* identificacion: ,
      marca: ,
      modelo: ,
      factor_diferencial: ,
      calificacion_manejo: ,
      calificacion_satisfaccion: , */
    };

    const response = await request(app)
      .post("/encuestas")
      .send(encuestaData);
    
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
  });

  it("Debería obtener todas las encuestas", async () => {
    const response = await request(app).get("/encuestas");
    expect(response.status).toBe(200);
  });

  it("Debería editar una encuesta existente", async () => {
    const identificacion = 1;
    const encuestaData = {
      marca: "Nueva Marca",
      modelo: "Nuevo Modelo",
      factor_diferencial: "Nuevo Factor",
      calificacion_manejo: 5,
      calificacion_satisfaccion: 4,
    };

    const response = await request(app)
      .put(`/encuestas/${identificacion}`)
      .send(encuestaData);
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });

  it("Debería inactivar una encuesta existente", async () => {
    const identificacion = 1;

    const response = await request(app)
      .put(`/inactivar-encuesta/${identificacion}`);
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });


});
