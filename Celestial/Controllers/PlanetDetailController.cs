using Celestial.Models;
using Celestial.Repositories;
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
    public class PlanetDetailController : ControllerBase
    {
        private readonly IPlanetDetailRepository _planetDetailRepository;
        private readonly IUserRepository _userRepository;
        public PlanetDetailController(IPlanetDetailRepository planetDetailRepository, IUserRepository userRepository)
        {
            _planetDetailRepository = planetDetailRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUserId = GetCurrentUserProfile();
            var planetDetail = _planetDetailRepository.GetAll();

            return Ok(planetDetail);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var currentUserId = GetCurrentUserProfile();
            var planetDetails = _planetDetailRepository.GetDetailsByPlanetId(id);

            return Ok(planetDetails);
        }

        [HttpPost]
        public IActionResult Post(PlanetDetail planetDetail)
        {
            planetDetail.UserId = GetCurrentUserProfile().Id;
            try
            {
                _planetDetailRepository.Add(planetDetail);
                return CreatedAtAction("Get", new { id = planetDetail.Id }, planetDetail);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _planetDetailRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        public IActionResult Update(PlanetDetail planetDetail)
        {

            try
            {
                _planetDetailRepository.Update(planetDetail);

                return Ok(planetDetail);
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
