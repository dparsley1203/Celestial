using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Models
{
    public class Planet
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Diameter { get; set; }
        [Required]
        public int DistanceFromStar { get; set; }
        [Required]
        public int OrbitalPeriod { get; set; }
        public int StarId { get; set; }
        public Star Star { get; set; }
        public int PlanetTypeId { get; set; }
        public PlanetType PlanetType { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
