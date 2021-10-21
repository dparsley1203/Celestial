using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IStarRepository
    {
        List<Star> GetAll();
    }
}