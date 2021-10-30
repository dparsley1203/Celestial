using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IMoonDetailRepository
    {
        void Add(MoonDetail moonDetail);
        void Delete(int id);
        List<MoonDetail> GetAll();
        List<MoonDetail> GetMoonDetailByMoonId(int id);
        void Update(MoonDetail moonDetail);
    }
}