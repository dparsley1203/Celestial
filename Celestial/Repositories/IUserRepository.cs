using Celestial.Models;
using System.Collections.Generic;

namespace Celestial.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        void Delete(int id);
        List<User> GetAll();
        User GetByFireBaseId(string fireBaseId);
        User GetById(int id);
        void Update(User user);
    }
}