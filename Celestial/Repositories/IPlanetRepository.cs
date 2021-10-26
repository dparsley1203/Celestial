using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IPlanetRepository
    {
        void Delete(int id);
        List<Planet> GetAll(string fireBaseId);
        Planet GetPlanetById(int id);
        List<Planet> GetPlanetsByStarId(int id);
        void Add(Planet planet);
        void Update(Planet planet);
    }
}