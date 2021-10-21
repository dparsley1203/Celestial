using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Models
{
    public class PlanetDetail
    {
        public int Id { get; set; }
        public int PlanetId { get; set; }
        public Planet Planet { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Notes { get; set; }
    }
}
