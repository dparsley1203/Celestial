using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Models
{
    public class Moon
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Diameter { get; set; }
        [Required]
        public int DistanceFromPlanet { get; set; }
        [Required]
        public int OrbitalPeriod { get; set; }
        public int MoonTypeId { get; set; }
        public MoonType MoonType{get; set;}
        public int PlanetId { get; set; }
        public Planet Planet { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
