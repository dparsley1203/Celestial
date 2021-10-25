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
    public class StarTypeRepository : BaseRepository, IStarTypeRepository
    {
        public StarTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<StarType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                //gets all the stars, types, and user who made them
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM StarType";

                    var reader = cmd.ExecuteReader();
                    var starTypes = new List<StarType>();
                    while (reader.Read())
                    {
                        starTypes.Add(NewStarTypeFormReader(reader));
                    }

                    reader.Close();
                    return starTypes;
                }
            }
        }

        public StarType GetStarTypeById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM StarType
                                        WHERE StarType.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    StarType starType = null;
                    if (reader.Read())
                    {
                        starType = (NewStarTypeFormReader(reader));
                    }

                    reader.Close();
                    return starType;
                }
            }
        }

        private StarType NewStarTypeFormReader(SqlDataReader reader)
        {
            return new StarType()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Type = DbUtils.GetString(reader, "Type"),
                Details = DbUtils.GetString(reader, "Details"),
            };
        }
    }
}
