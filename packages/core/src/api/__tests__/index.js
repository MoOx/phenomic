import request from "supertest";

import db from "../../db";
import dbFixtures from "../../db/__tests__/__fixtures__";

import createServer from "..";

db._setDatabase(dbFixtures);

const server = createServer(db, [
  {
    name: "test-api",
    define: () => {}
  },
  {
    name: "test-nothing"
  }
]);

it("should return basic response", async () => {
  await request(server)
    .get("/unknown")
    .expect(404);

  await request(server)
    .get("/")
    .expect(200);
});

it("should return handle simple query for list", async () => {
  await request(server)
    .get("/news/by-default/1/asc.json")
    .expect(200);

  await request(server)
    .get("/news/by-default/1/asc/limit-2.json")
    .expect(200);

  // await request(server)
  //   .get("/news/by-default/1/asc/limit-:limit/after-:after.json")
  //   .expect(200);
});

it("should return handle simple query for items", async () => {
  await request(server)
    .get("/item/unknown.json")
    .expect(404);

  await request(server)
    .get("/item/news/2017/06/introducing-1.0.0-alpha.json")
    .expect(200);

  await request(server)
    .get("/unknown/item/really.json")
    .expect(404);

  await request(server)
    .get("/news/item/2017/06/introducing-1.0.0-alpha.json")
    .expect(200);
});
