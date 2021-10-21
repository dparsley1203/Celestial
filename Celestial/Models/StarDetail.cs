using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Models
{
    public class StarDetail
    {
        public int Id { get; set; }
        public int StarId { get; set; }
        public Star Star { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Notes { get; set; }
    }
}
