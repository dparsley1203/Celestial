using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Models
{
    public class Star
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Diameter { get; set; }

        public int Mass { get; set; }
        public int StarTypeId { get; set; }
        public int Temperature { get; set; }
        public StarType StarType { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsByCurrentUser { get; set; }
    }
}
