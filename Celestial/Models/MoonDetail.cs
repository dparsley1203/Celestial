using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Models
{
    public class MoonDetail
    {
        public int Id { get; set; }
        public int MoonId { get; set; }
        public Moon Moon { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Notes { get; set; }
    }
}
