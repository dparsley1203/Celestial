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
    public class PlanetDetailRepository : BaseRepository, IPlanetDetailRepository
    {
        public PlanetDetailRepository(IConfiguration configuration) : base(configuration) { }

        public List<PlanetDetail> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT pd.Id, pd.PlanetId, pd.UserId, pd.Notes,
                                        p.Id, p.Name, p.Diameter, p.DistanceFromStar, p.OrbitalPeriod, 
                                        u.Id, u.UserName, u.Email
                                        
                                        FROM PlanetDetail pd
                                        LEFT JOIN Planet p ON p.Id = pd.PlanetId
                                        LEFT JOIN [User] u On u.Id = pd.UserId";

                    /*DbUtils.AddParameter(cmd, "@FireBaseId", fireBaseId);*/
                    var reader = cmd.ExecuteReader();
                    var planetDetails = new List<PlanetDetail>();
                    while (reader.Read())
                    {
                        planetDetails.Add(NewPlanetDetailFormReader(reader));
                    }

                    reader.Close();
                    return planetDetails;
                }
            }
        }

        public PlanetDetail GetPlanetDetailById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT pd.Id, pd.PlanetId, pd.UserId, pd.Notes,
                                        p.Id, p.Name, p.Diameter, p.DistanceFromStar, p.OrbitalPeriod, 
                                        u.Id, u.UserName, u.Email
                                        
                                        FROM PlanetDetail pd
                                        LEFT JOIN Planet p ON p.Id = pd.PlanetId
                                        LEFT JOIN [User] u On u.Id = pd.UserId
                                        WHERE pd.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    PlanetDetail planetDetails = null;
                    if (reader.Read())
                    {
                        planetDetails = (NewPlanetDetailFormReader(reader));
                    }

                    reader.Close();
                    return planetDetails;
                }
            }
        }

        public List<PlanetDetail> GetDetailsByPlanetId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT pd.Id, pd.PlanetId, pd.UserId, pd.Notes,
                                        p.Id, p.Name, p.Diameter, p.DistanceFromStar, p.OrbitalPeriod, 
                                        u.Id, u.UserName, u.Email
                                        
                                        FROM PlanetDetail pd
                                        LEFT JOIN Planet p ON p.Id = pd.PlanetId
                                        LEFT JOIN [User] u On u.Id = pd.UserId
                                        WHERE pd.PlanetId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var planetDetails = new List<PlanetDetail>();
                    while (reader.Read())
                    {
                        planetDetails.Add(NewPlanetDetailFormReader(reader));
                    }

                    reader.Close();
                    return planetDetails;
                }
            }
        }

        public void Add(PlanetDetail planetDetail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PlanetDetail (PlanetId, UserId, Notes)
                                        OUTPUT Inserted.Id
                                        VALUES (@planetId, @userId, @notes)";

                    DbUtils.AddParameter(cmd, "@planetId", planetDetail.PlanetId);
                    DbUtils.AddParameter(cmd, "@userId", planetDetail.UserId);
                    DbUtils.AddParameter(cmd, "@notes", planetDetail.Notes);

                    planetDetail.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM PlanetDetail WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(PlanetDetail planetDetail)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE PlanetDetail
                                        SET PlanetId = @planetId, Notes = @notes  
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@planetId", planetDetail.PlanetId);
                    DbUtils.AddParameter(cmd, "@notes", planetDetail.Notes);
                    DbUtils.AddParameter(cmd, "@Id", planetDetail.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private PlanetDetail NewPlanetDetailFormReader(SqlDataReader reader)
        {
            return new PlanetDetail()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                PlanetId = DbUtils.GetInt(reader, "PlanetId"),
                Planet = new Planet()
                {
                    Id = DbUtils.GetInt(reader, "PlanetId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    Diameter = DbUtils.GetInt(reader, "Diameter"),
                    DistanceFromStar = DbUtils.GetInt(reader, "DistanceFromStar"),
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
