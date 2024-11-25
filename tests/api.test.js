import { jest } from "@jest/globals";
import fetchFilmData from "../api";

global.fetch = jest.fn();

test("fetchFilmData returns film data for valid title", async () => {
  // simulating API response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      Response: "True",
      Title: "After Hours",
      Year: "1985",
      Metascore: "90",
    }),
  });

  const data = await fetchFilmData("After Hours");

  expect(data.Title).toBe("After Hours");
  expect(data.Metascore).toBe("90");
});
