using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IPlanetTypeRepository
    {
        List<PlanetType> GetAll();
        PlanetType GetPlanetTypeById(int id);
    }
}