using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IMoonRepository
    {
        void Add(Moon moon);
        void Delete(int id);
        List<Moon> GetAllMoonsByUserId(int id);
        Moon GetMoonsById(int id);
        void Update(Moon moon);
    }
}