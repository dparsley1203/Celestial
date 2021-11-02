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
    public class MoonDetailRepository : BaseRepository, IMoonDetailRepository
    {
        public MoonDetailRepository(IConfiguration configuration) : base(configuration) { }

        public List<MoonDetail> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT md.Id, md.MoonId, md.UserId, md.Notes,
                                                m.Id, m.Name, m.Diameter, m.DistanceFromPlanet,
                                                m.OrbitalPeriod,
                                                u.Id, u.UserName, u.Email
                            
                                        FROM MoonDetail md

                                        LEFT JOIN Moon m ON m.Id = md.MoonId 
                                        LEFT JOIN [User] u ON u.Id = md.UserId";

                    var reader = cmd.ExecuteReader();
                    var moonDetail = new List<MoonDetail>();
                    while (reader.Read())
                    {
                        moonDetail.Add(NewMoonDetailFormReader(reader));
                    }

                    reader.Close();
                    return moonDetail;

                }
            }
        }

        public List<MoonDetail> GetMoonDetailByMoonId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT md.Id, md.MoonId, md.UserId, md.Notes,
                                                m.Id, m.Name, m.Diameter, m.DistanceFromPlanet,
                                                m.OrbitalPeriod,
                                                u.Id, u.UserName, u.Email

                                        FROM MoonDetail md

                                        LEFT JOIN Moon m ON m.Id = md.MoonId 
                                        LEFT JOIN [User] u ON u.Id = md.UserId
                                        WHERE md.MoonId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    var moonDetails = new List<MoonDetail>();
                    while (reader.Read())
                    {
                        moonDetails.Add(NewMoonDetailFormReader(reader));
                    }

                    reader.Close();
                    return moonDetails;

                }
            }
        }

        public void Add(MoonDetail moonDetail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO MoondDetail (MoondId, UserId, Notes)
                                        OUTPUT Inserted.Id
                                        VALUES (@moonId, @userId, @notes)";

                    DbUtils.AddParameter(cmd, "@moonId", moonDetail.MoonId);
                    DbUtils.AddParameter(cmd, "@userId", moonDetail.UserId);
                    DbUtils.AddParameter(cmd, "@notes", moonDetail.Notes);

                    moonDetail.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM MoonDetail WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(MoonDetail moonDetail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE MoonDetail
                                        SET MoonId = @moonId, Notes = @notes  
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@moonId", moonDetail.MoonId);
                    DbUtils.AddParameter(cmd, "@notes", moonDetail.Notes);
                    DbUtils.AddParameter(cmd, "@Id", moonDetail.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private MoonDetail NewMoonDetailFormReader(SqlDataReader reader)
        {
            return new MoonDetail()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                MoonId = DbUtils.GetInt(reader, "MoonId"),
                Moon = new Moon()
                {
                    Id = DbUtils.GetInt(reader, "MoonId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    Diameter = DbUtils.GetInt(reader, "Diameter"),
                    DistanceFromPlanet = DbUtils.GetInt(reader, "DistanceFromPlanet"),
                    OrbitalPeriod = DbUtils.GetInt(reader, "OrbitalPeriod"),
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
