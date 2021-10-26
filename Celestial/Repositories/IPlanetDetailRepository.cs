using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IPlanetDetailRepository
    {
        void Add(PlanetDetail planetDetail);
        void Delete(int id);
        List<PlanetDetail> GetAll();
        List<PlanetDetail> GetDetailsByPlanetId(int id);
        PlanetDetail GetPlanetDetailById(int id);
        void Update(PlanetDetail planetDetail);
    }
}