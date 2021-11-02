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
    public class MoonRepository : BaseRepository, IMoonRepository
    {
        public MoonRepository(IConfiguration configuration) : base(configuration) { }

        public List<Moon> GetAllMoonsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT m.Id, m.Name, m.Diameter, m.DistanceFromPlanet,
                                          m.OrbitalPeriod AS MoonOrbit, m.PlanetId, m.MoonTypeId, m.UserId,

                                          p.Name AS PlanetName, p.Diameter AS PlanetDiameter, p.DistanceFromStar, 
                                          p.OrbitalPeriod AS PlanetOrbit,

                                          mt.Type, mt.Details,

                                          u.UserName, u.Email
                                
                                          FROM Moon m

                                          LEFT JOIN Planet p ON p.Id = m.PlanetId
                                          LEFT JOIN MoonType mt ON mt.Id = m.MoonTypeId                                       
                                          LEFT JOIN [User] u ON u.Id = m.UserId
                                          WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var moons = new List<Moon>();
                    while (reader.Read())
                    {
                        moons.Add(NewMoonFormReader(reader));
                    }

                    reader.Close();
                    return moons;
                }
            }
        }

        public Moon GetMoonsById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT m.Id, m.Name, m.Diameter, m.DistanceFromPlanet,
                                          m.OrbitalPeriod AS MoonOrbit, m.PlanetId, m.MoonTypeId, m.UserId,

                                          p.Name AS PlanetName, p.Diameter AS PlanetDiameter, p.DistanceFromStar, 
                                          p.OrbitalPeriod AS PlanetOrbit,

                                          mt.Type, mt.Details,

                                          u.UserName, u.Email
                                
                                          FROM Moon m

                                          LEFT JOIN Planet p ON p.Id = m.PlanetId
                                          LEFT JOIN MoonType mt ON mt.Id = m.MoonTypeId                                       
                                          LEFT JOIN [User] u ON u.Id = m.UserId
                                          WHERE m.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Moon moon = null;

                    if (reader.Read())
                    {
                        moon = NewMoonFormReader(reader);
                    }

                    reader.Close();
                    return moon;
                }
            }
        }

        public void Add(Moon moon)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Moon (Name, Diameter, DistanceFromPlanet, OrbitalPeriod, 
                                        PlanetId, MoonTypeId, UserId)
                                        OUTPUT Inserted.Id
                                        VALUES (@name, @diameter, @distanceFromPlanet, @orbitalPeriod, 
                                        @planetId, @moonTypeId, @userId)";

                    DbUtils.AddParameter(cmd, "@name", moon.Name);
                    DbUtils.AddParameter(cmd, "@diameter", moon.Diameter);
                    DbUtils.AddParameter(cmd, "@distanceFromPlanet", moon.DistanceFromPlanet);
                    DbUtils.AddParameter(cmd, "@orbitalPeriod", moon.OrbitalPeriod);
                    DbUtils.AddParameter(cmd, "@planetId", moon.PlanetId);
                    DbUtils.AddParameter(cmd, "@moonTypeId", moon.MoonTypeId);
                    DbUtils.AddParameter(cmd, "@userId", moon.UserId);

                    moon.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Moon WHERE Id = @Id";
                    //unable to delete due to FK
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Moon moon)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Update Moon 
                                        SET Name = @name, Diameter = @diameter, 
                                        DistanceFromPlanet = @distanceFromPlanet, OrbitalPeriod = @orbitalPeriod, 
                                        PlanetId = @planetId, MoonTypeId = @moonTypeId, UserId = @userId
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@name", moon.Name);
                    DbUtils.AddParameter(cmd, "@diameter", moon.Diameter);
                    DbUtils.AddParameter(cmd, "@distanceFromPlanet", moon.DistanceFromPlanet);
                    DbUtils.AddParameter(cmd, "@orbitalPeriod", moon.OrbitalPeriod);
                    DbUtils.AddParameter(cmd, "@planetId", moon.PlanetId);
                    DbUtils.AddParameter(cmd, "@moonTypeId", moon.MoonTypeId);
                    DbUtils.AddParameter(cmd, "@userId", moon.UserId);
                    DbUtils.AddParameter(cmd, "@Id", moon.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Moon NewMoonFormReader(SqlDataReader reader)
        {
            return new Moon()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Diameter = DbUtils.GetInt(reader, "Diameter"),
                DistanceFromPlanet = DbUtils.GetInt(reader, "DistanceFromPlanet"),
                OrbitalPeriod = DbUtils.GetInt(reader, "MoonOrbit"),
                PlanetId = DbUtils.GetInt(reader, "PlanetId"),
                Planet = new Planet()
                {
                    Id = DbUtils.GetInt(reader, "PlanetId"),
                    Name = DbUtils.GetString(reader, "PlanetName"),
                    Diameter = DbUtils.GetInt(reader, "PlanetDiameter"),
                    DistanceFromStar = DbUtils.GetInt(reader, "DistanceFromStar"),
                    OrbitalPeriod = DbUtils.GetInt(reader, "PlanetOrbit"),
                },
                MoonTypeId = DbUtils.GetInt(reader, "MoonTypeId"),
                MoonType = new MoonType()
                {
                    Id = DbUtils.GetInt(reader, "MoonTypeId"),
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
