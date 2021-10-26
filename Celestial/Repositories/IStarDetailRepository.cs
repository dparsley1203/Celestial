using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IStarDetailRepository
    {
        void Add(StarDetail starDetail);
        void Delete(int id);
        List<StarDetail> GetAll();
        List<StarDetail> GetDetailsByStarId(int id);
        StarDetail GetStarDetailById(int id);
        void Update(StarDetail starDetail);
    }
}