using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IStarTypeRepository
    {
        List<StarType> GetAll();
        StarType GetStarTypeById(int id);
    }
}