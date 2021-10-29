using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Models
{
    public class Moon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Diameter { get; set; }
        public int DistanceFromPlanet { get; set; }
        public int OrbitalPeriod { get; set; }
        public int MoonTypeId { get; set; }
        public MoonType MoonType{get; set;}
        public int PlanetId { get; set; }
        public Planet Planet { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
