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
    public class PlanetRepository : BaseRepository, IPlanetRepository
    {
        public PlanetRepository(IConfiguration configuration) : base(configuration) { }
        public List<Planet> GetAll(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                //gets all the stars, types, and user who made them
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"  SELECT p.Id, p.Name, p.Diameter, p.DistanceFromStar,
                                          p.OrbitalPeriod, p.StarId, p.PlanetTypeId, p.ColorId, p.UserId,

                                          s.Name AS SunName, s.Diameter AS SunDiameter, s.Mass, 
                                          s.Temperature,

                                          pt.Type, pt.Details,

                                          c.Id, c.Paint,

                                          u.UserName, u.Email
                                
                                          FROM Planet p

                                          LEFT JOIN Star s ON s.Id = p.StarId
                                          LEFT JOIN PlanetType pt ON pt.Id = p.PlanetTypeId
                                          LEFT JOIN Color c ON c.Id = p.ColorId
                                          LEFT JOIN [User] u ON u.Id = p.UserId

                                          WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var planets = new List<Planet>();
                    while (reader.Read())
                    {
                        planets.Add(NewPlanetFormReader(reader));
                    }

                    reader.Close();
                    return planets;
                }
            }
        }

        public Planet GetPlanetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Name, p.Diameter, p.DistanceFromStar,
                                          p.OrbitalPeriod, p.StarId, p.PlanetTypeId, p.ColorId, p.UserId,

                                          s.Name AS SunName, s.Diameter AS SunDiameter, s.Mass, 
                                          s.Temperature,

                                          pt.Type, pt.Details,

                                          c.Id, c.Paint,

                                          u.UserName, u.Email
                                
                                          FROM Planet p

                                          LEFT JOIN Star s ON s.Id = p.StarId
                                          LEFT JOIN PlanetType pt ON pt.Id = p.PlanetTypeId
                                          LEFT JOIN Color c ON c.Id = p.ColorId
                                          LEFT JOIN [User] u ON u.Id = p.UserId
                                          WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Planet planet = null;
                    if (reader.Read())
                    {
                        planet = NewPlanetFormReader(reader);
                    }

                    reader.Close();

                    return planet;
                }
            }
        }

        public List<Planet> GetPlanetsByStarId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Name, p.Diameter, p.DistanceFromStar,
                                          p.OrbitalPeriod, p.StarId, p.PlanetTypeId, p.ColorId, p.UserId,

                                          s.Name AS SunName, s.Diameter AS SunDiameter, s.Mass, 
                                          s.Temperature,

                                          pt.Type, pt.Details,

                                          c.Id, c.Paint,

                                          u.UserName, u.Email
                                
                                          FROM Planet p

                                          LEFT JOIN Star s ON s.Id = p.StarId
                                          LEFT JOIN PlanetType pt ON pt.Id = p.PlanetTypeId
                                          LEFT JOIN Color c ON c.Id = p.ColorId
                                          LEFT JOIN [User] u ON u.Id = p.UserId
                                          
                                          WHERE p.StarId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    List<Planet> planets = new List<Planet>();
                    while (reader.Read())
                    {
                        planets.Add(NewPlanetFormReader(reader));
                    }

                    reader.Close();

                    return planets;
                }
            }
        }

        public void Add(Planet planet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Planet (Name, Diameter, DistanceFromStar, OrbitalPeriod, 
                                        StarId, PlanetTypeId, ColorId, UserId)
                                        OUTPUT Inserted.Id
                                        VALUES (@name, @diameter, @distanceFromStar, @orbitalPeriod, 
                                        @starId, @planetTypeId, @colorId, @userId)";

                    DbUtils.AddParameter(cmd, "@name", planet.Name);
                    DbUtils.AddParameter(cmd, "@diameter", planet.Diameter);
                    DbUtils.AddParameter(cmd, "@distanceFromStar", planet.DistanceFromStar);
                    DbUtils.AddParameter(cmd, "@orbitalPeriod", planet.OrbitalPeriod);
                    DbUtils.AddParameter(cmd, "@starId", planet.StarId);
                    DbUtils.AddParameter(cmd, "@planetTypeId", planet.PlanetTypeId);
                    DbUtils.AddParameter(cmd, "@colorId", planet.ColorId);
                    DbUtils.AddParameter(cmd, "@userId", planet.UserId);

                    planet.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Planet WHERE Id = @Id";
                    //unable to delete due to FK
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Planet planet)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Planet
                                        SET Name = @name, Diameter = @diameter, DistanceFromStar = @distanceFromStar, 
                                        OrbitalPeriod = @orbitalPeriod, StarId = @starId, PlanetTypeId = @planetTypeId,
                                        ColorId = @colorId, UserId = @userId
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@name", planet.Name);
                    DbUtils.AddParameter(cmd, "@diameter", planet.Diameter);
                    DbUtils.AddParameter(cmd, "@distanceFromStar", planet.DistanceFromStar);
                    DbUtils.AddParameter(cmd, "@orbitalPeriod", planet.OrbitalPeriod);
                    DbUtils.AddParameter(cmd, "@starId", planet.StarId);
                    DbUtils.AddParameter(cmd, "@planetTypeId", planet.PlanetTypeId);
                    DbUtils.AddParameter(cmd, "@colorId", planet.ColorId);
                    DbUtils.AddParameter(cmd, "@userId", planet.UserId);
                    DbUtils.AddParameter(cmd, "@Id", planet.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Planet NewPlanetFormReader(SqlDataReader reader)
        {
            return new Planet()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Diameter = DbUtils.GetInt(reader, "Diameter"),
                DistanceFromStar = DbUtils.GetInt(reader, "DistanceFromStar"),
                OrbitalPeriod = DbUtils.GetInt(reader, "OrbitalPeriod"),
                StarId = DbUtils.GetInt(reader, "StarId"),
                Star = new Star()
                {
                    Id = DbUtils.GetInt(reader, "StarId"),
                    Name = DbUtils.GetString(reader, "SunName"),
                    Diameter = DbUtils.GetInt(reader, "SunDiameter"),
                    Mass = DbUtils.GetInt(reader, "Mass"),
                    Temperature = DbUtils.GetInt(reader, "Temperature"),
                },
                PlanetTypeId = DbUtils.GetInt(reader, "PlanetTypeId"),
                PlanetType = new PlanetType()
                {
                    Id = DbUtils.GetInt(reader, "PlanetTypeId"),
                    Type = DbUtils.GetString(reader, "Type"),
                    Details = DbUtils.GetString(reader, "Details"),
                },
                ColorId = DbUtils.GetInt(reader, "ColorId"),
                Color = new Color
                {
                    Id = DbUtils.GetInt(reader, "ColorId"),
                    Paint = DbUtils.GetString(reader, "Paint"),
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
