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
    public class PlanetTypeRepository : BaseRepository, IPlanetTypeRepository
    {
        public PlanetTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<PlanetType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM PlanetType";

                    var reader = cmd.ExecuteReader();
                    var planetTypes = new List<PlanetType>();
                    while (reader.Read())
                    {
                        planetTypes.Add(NewPlanetTypeFormReader(reader));
                    }

                    reader.Close();
                    return planetTypes;
                }
            }
        }

        public PlanetType GetPlanetTypeById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM PlanetType
                                        WHERE PlanetType.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    PlanetType planetType = null;
                    if (reader.Read())
                    {
                        planetType = (NewPlanetTypeFormReader(reader));
                    }

                    reader.Close();
                    return planetType;
                }
            }
        }

        private PlanetType NewPlanetTypeFormReader(SqlDataReader reader)
        {
            return new PlanetType()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Type = DbUtils.GetString(reader, "Type"),
                Details = DbUtils.GetString(reader, "Details"),
            };
        }
    }
}
