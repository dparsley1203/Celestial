using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IStarRepository
    {
        List<Star> GetAll(int id);
        Star GetStarById(int id);
        void Add(Star star);
        void Delete(int id);
        void Update(Star star);
    }
}