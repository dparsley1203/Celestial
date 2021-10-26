using Celestial.Models;
using Celestial.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Repositories
{
    public class StarDetailRepository : BaseRepository, IStarDetailRepository
    {
        public StarDetailRepository(IConfiguration configuration) : base(configuration) { }

        public List<StarDetail> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT sd.Id, sd.StarId, sd.UserId, sd.Notes,
                                        s.Id, s.Name, s.Diameter, s.mass, s.Temperature, 
                                        u.Id, u.UserName, u.Email
                                        
                                        FROM StarDetail sd
                                        JOIN Star s ON s.Id = sd.StarId
                                        JOIN [User] u On u.Id = sd.UserId";

                    /*DbUtils.AddParameter(cmd, "@FireBaseId", fireBaseId);*/
                    var reader = cmd.ExecuteReader();
                    var starDetails = new List<StarDetail>();
                    while (reader.Read())
                    {
                        starDetails.Add(NewStarDetailFormReader(reader));
                    }

                    reader.Close();
                    return starDetails;
                }
            }
        }

        public StarDetail GetStarDetailById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT sd.Id, sd.StarId, sd.UserId, sd.Notes,
                                        s.Id, s.Name, s.Diameter, s.mass, s.Temperature, 
                                        u.Id, u.UserName, u.Email
                                        
                                        FROM StarDetail sd
                                        JOIN Star s ON s.Id = sd.StarId
                                        JOIN [User] u On u.Id = sd.UserId
                                        WHERE sd.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    StarDetail starDetail = null;
                    if (reader.Read())
                    {
                        starDetail = (NewStarDetailFormReader(reader));
                    }

                    reader.Close();
                    return starDetail;
                }
            }
        }

        public List<StarDetail> GetDetailsByStarId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT sd.Id, sd.StarId, sd.UserId, sd.Notes,
                                        s.Id, s.Name, s.Diameter, s.mass, s.Temperature, 
                                        u.Id, u.UserName, u.Email
                                        
                                        FROM StarDetail sd
                                        JOIN Star s ON s.Id = sd.StarId
                                        JOIN [User] u On u.Id = sd.UserId
                                        WHERE sd.StarId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    List<StarDetail> starDetails = new List<StarDetail>();
                    while (reader.Read())
                    {
                        starDetails.Add(NewStarDetailFormReader(reader));
                    }

                    reader.Close();
                    return starDetails;
                }
            }
        }

        public void Add(StarDetail starDetail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Star (StarId, UserId, Notes)
                                        OUTPUT Inserted.Id
                                        VALUES (@starId, @userId, @notes)";

                    DbUtils.AddParameter(cmd, "@starId", starDetail.StarId);
                    DbUtils.AddParameter(cmd, "@userId", starDetail.UserId);
                    DbUtils.AddParameter(cmd, "@notes", starDetail.Notes);

                    starDetail.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM StarDetail WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(StarDetail starDetail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE StarDetail
                                        SET StarId = @starId, Notes = @notes  
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@starId", starDetail.StarId);
                    DbUtils.AddParameter(cmd, "@notes", starDetail.Notes);
                    DbUtils.AddParameter(cmd, "@Id", starDetail.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private StarDetail NewStarDetailFormReader(SqlDataReader reader)
        {
            return new StarDetail()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                StarId = DbUtils.GetInt(reader, "StarId"),
                Star = new Star()
                {
                    Id = DbUtils.GetInt(reader, "StarId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    Diameter = DbUtils.GetInt(reader, "Diameter"),
                    Mass = DbUtils.GetInt(reader, "Mass"),
                    Temperature = DbUtils.GetInt(reader, "Temperature"),
                },
                UserId = DbUtils.GetInt(reader, "UserId"),
                User = new User()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    UserName = DbUtils.GetString(reader, "UserName"),
                    Email = DbUtils.GetString(reader, "Email"),
                },
                Notes = DbUtils.GetString(reader, "Notes"),
            };
        }
    }
}
