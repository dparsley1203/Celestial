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
    public class MoonTypeRepository : BaseRepository, IMoonTypeRepository
    {
        public MoonTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<MoonType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM MoonType";

                    var reader = cmd.ExecuteReader();
                    var moonType = new List<MoonType>();
                    while (reader.Read())
                    {
                        moonType.Add(NewMoonTypeFormReader(reader));
                    }

                    reader.Close();
                    return moonType;
                }
            }
        }

        public MoonType GetMoonTypeById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM MoonType WHERE MoonType.Id = @Id";

                    var reader = cmd.ExecuteReader();
                    MoonType moonType = null;
                    if (reader.Read())
                    {
                        moonType = NewMoonTypeFormReader(reader);
                    }

                    reader.Close();
                    return moonType;
                }
            }
        }

        private MoonType NewMoonTypeFormReader(SqlDataReader reader)
        {
            return new MoonType()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Type = DbUtils.GetString(reader, "Type"),
                Details = DbUtils.GetString(reader, "Details"),
            };
        }
    }
}
