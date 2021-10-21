using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Celestial.Models;
using Celestial.Utils;

namespace Celestial.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT u.Id, u.FireBaseId, u.UserName, u.Email
                                      

                                        FROM [User] u";

                    var reader = cmd.ExecuteReader();

                    var profiles = new List<User>();
                    while (reader.Read())
                    {
                        profiles.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                        });
                    }

                    reader.Close();

                    return profiles;
                }
            }
        }
        public User GetByFireBaseId(string fireBaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FireBaseId, u.UserName, u.Email
                          FROM [User] u
                         WHERE FireBaseId = @FireBaseId";

                    DbUtils.AddParameter(cmd, "@FireBaseId", fireBaseId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.Id, u.UserName, u.Email
                                        FROM [User] u
                                        WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                    }

                    reader.Close();
                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FireBaseId, UserName, Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @UserName, @Email)";

                    DbUtils.AddParameter(cmd, "@FireBaseId", user.FireBaseId);
                    DbUtils.AddParameter(cmd, "@Name", user.UserName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                           SET UserName = @userName,
                               Email = @email,
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@name", user.UserName);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    cmd.ExecuteNonQuery();
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
                    cmd.CommandText = "DELETE FROM [User] WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
