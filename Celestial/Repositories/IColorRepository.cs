using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IColorRepository
    {
        List<Color> GetAll();
        Color GetById(int id);
    }
}