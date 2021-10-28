using Celestial.Models;
using Celestial.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Repositories
{
    public class ColorRepository : BaseRepository, IColorRepository
    {
        public ColorRepository(IConfiguration configuration) : base(configuration) { }

        public List<Color> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Color";

                    var reader = cmd.ExecuteReader();
                    var colors = new List<Color>();
                    while (reader.Read())
                    {
                        colors.Add(new Color()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Paint = DbUtils.GetString(reader, "Paint"),
                        });
                    }

                    reader.Close();
                    return colors;
                }
            }
        }

        public Color GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Paint
                            FROM Color
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Color color = null;
                    if (reader.Read())
                    {
                        color = new Color()
                        {
                            Id = id,
                            Paint = DbUtils.GetString(reader, "Paint"),
                        };
                    }

                    reader.Close();

                    return color;
                }
            }
        }
    }
}
