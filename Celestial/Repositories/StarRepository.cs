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

        public List<Star> GetAll(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                //gets all the stars, types, and user who made them
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  SELECT s.Id, s.Name, s.Diameter, s.Mass, 
                                          s.Temperature, s.StarTypeId, s.UserId,
                                          st.Type, st.Details,
                                          u.UserName, u.Email

                                          FROM Star s

                                          LEFT JOIN StarType st ON s.StarTypeId = st.Id
                                          LEFT JOIN [User] u on s.userId = u.Id
                                          WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

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

        public Star GetStarById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                //Gets a single star by Id
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id, s.Name, s.Diameter, s.Mass, 
                                          s.Temperature, s.StarTypeId, s.UserId,
                                          st.Type, st.Details,
                                          u.UserName, u.Email

                                          FROM Star s

                                          JOIN StarType st ON s.StarTypeId = st.Id
                                          JOIN [User] u on s.userId = u.Id
                                          WHERE s.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Star star = null;
                    if (reader.Read())
                    {
                        star = NewStarFormReader(reader);
                    }

                    reader.Close();

                    return star;
                }
            }
        }

        public void Add(Star star)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Star (Name, Diameter, Mass, Temperature, StarTypeId, UserId)
                                        OUTPUT Inserted.Id
                                        VALUES (@name, @diameter, @mass, @temperature, @starTypeId, @userId)";

                    DbUtils.AddParameter(cmd, "@name", star.Name);
                    DbUtils.AddParameter(cmd, "@diameter", star.Diameter);
                    DbUtils.AddParameter(cmd, "@mass", star.Mass);
                    DbUtils.AddParameter(cmd, "@temperature", star.Temperature);
                    DbUtils.AddParameter(cmd, "@starTypeId", star.StarTypeId);
                    DbUtils.AddParameter(cmd, "@userId", star.UserId);

                    star.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Star WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Star star)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Star
                                        SET Name = @name, Diameter = @diameter, Mass = @mass, 
                                        Temperature = @temperature, StarTypeId = @starTypeId
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@name", star.Name);
                    DbUtils.AddParameter(cmd, "@diameter", star.Diameter);
                    DbUtils.AddParameter(cmd, "@mass", star.Mass);
                    DbUtils.AddParameter(cmd, "@temperature", star.Temperature);
                    DbUtils.AddParameter(cmd, "@starTypeId", star.StarTypeId);
                    DbUtils.AddParameter(cmd, "@Id", star.Id);

                    cmd.ExecuteNonQuery();
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
