using Celestial.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Celestial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanetTypeController : ControllerBase
    {
        private readonly IPlanetTypeRepository _planetTypeRepository;

        public PlanetTypeController(IPlanetTypeRepository planetTypeRepository)
        {
            _planetTypeRepository = planetTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var planetType = _planetTypeRepository.GetAll();

            return Ok(planetType);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var planetType = _planetTypeRepository.GetPlanetTypeById(id);
            if (planetType == null)
            {
                return NotFound();
            }
            return Ok(planetType);
        }
    }
}
