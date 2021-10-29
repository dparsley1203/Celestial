using Celestial.Models;
using Celestial.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Celestial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    
    public class PlanetController : ControllerBase
    {
        private readonly IPlanetRepository _planetRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPlanetDetailRepository _planetDetailRepository;
        private readonly IPlanetTypeRepository _planetTypeRepository;

        public PlanetController(IPlanetRepository planetRepository, IUserRepository userRepository, IPlanetDetailRepository planetDetailRepository, IPlanetTypeRepository planetTypeRepository)
        {
            _planetRepository = planetRepository;
            _userRepository = userRepository;
            _planetDetailRepository = planetDetailRepository;
            _planetTypeRepository = planetTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUserId = GetCurrentUserProfile();
            var planets = _planetRepository.GetAll(currentUserId.Id);

            return Ok(planets);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var currentUserId = GetCurrentUserProfile().Id;
            var planet = _planetRepository.GetPlanetById(id);
            var details = _planetDetailRepository.GetDetailsByPlanetId(id);

            if (planet == null)
            {
                return NotFound();
            }
            return Ok(planet);
        }

        [HttpGet("SolarSystem/{id}")]
        public IActionResult GetPlanetsByStar(int id)
        {
            
            var planet = _planetRepository.GetPlanetsByStarId(id);
            

            if (planet == null)
            {
                return NotFound();
            }
            return Ok(planet);
        }

        [HttpPost]
        public IActionResult Post(Planet planet)
        {
            planet.UserId = GetCurrentUserProfile().Id;
            try
            {
                _planetRepository.Add(planet);
                return CreatedAtAction("Get", new { id = planet.Id }, planet);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _planetRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        public IActionResult Update(Planet planet)
        {

            try
            {
                _planetRepository.Update(planet);

                return Ok(planet);
            }
            catch
            {
                return BadRequest();
            }
        }

        private User GetCurrentUserProfile()
        {
            var fireBaseId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return _userRepository.GetByFireBaseId(fireBaseId);
        }
    }
}
