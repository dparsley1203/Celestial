using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IMoonTypeRepository
    {
        List<MoonType> GetAll();
        MoonType GetMoonTypeById(int id);
    }
}