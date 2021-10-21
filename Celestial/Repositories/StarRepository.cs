using Celestial.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Celestial.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Repositories
{
    public class StarRepository : BaseRepository, IStarRepository
    {
        public StarRepository(IConfiguration configuration) : base(configuration) { }

        public List<Star> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  SELECT s.Id, s.Name, s.Diameter, s.Mass, 
                                          s.Temperature, s.StarTypeId, s.UserId,
                                          st.Type, st.Details,
                                          u.UserName, u.Email

                                          FROM Star s

                                          JOIN StarType st ON s.StarTypeId = st.Id
                                          JOIN [User] u on s.userId = u.Id";

                    var reader = cmd.ExecuteReader();
                    var stars = new List<Star>();
                    while (reader.Read())
                    {
                        stars.Add(NewStarFormReader(reader));
                    }

                    reader.Close();
                    return stars;
                }
            }
        }

        private Star NewStarFormReader(SqlDataReader reader)
        {
            return new Star()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Diameter = DbUtils.GetInt(reader, "Diameter"),
                Mass = DbUtils.GetInt(reader, "Mass"),
                Temperature = DbUtils.GetInt(reader, "Temperature"),
                StarTypeId = DbUtils.GetInt(reader, "StarTypeId"),
                StarType = new StarType()
                {
                    Id = DbUtils.GetInt(reader, "StarTypeId"),
                    Type = DbUtils.GetString(reader, "Type"),
                    Details = DbUtils.GetString(reader, "Details"),
                },
                UserId = DbUtils.GetInt(reader, "UserId"),
                User = new User()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    UserName = DbUtils.GetString(reader, "UserName"),
                    Email = DbUtils.GetString(reader, "Email"),
                },

            };
        }

    }
}
