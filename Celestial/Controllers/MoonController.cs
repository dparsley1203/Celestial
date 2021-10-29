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
    public class MoonController : ControllerBase
    {
        private readonly IMoonRepository _moonRepository;
        private readonly IUserRepository _userRepository;

        public MoonController(IMoonRepository moonRepository, IUserRepository userRepository)
        {
            _moonRepository = moonRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUserId = GetCurrentUserProfile();
            var moons = _moonRepository.GetAllMoonsByUserId(currentUserId.Id);

            return Ok(moons);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var moon = _moonRepository.GetMoonsById(id);
  
            if (moon == null)
            {
                return NotFound();
            }
            return Ok(moon);
        }

        [HttpPost]
        public IActionResult Post(Moon moon)
        {
            moon.UserId = GetCurrentUserProfile().Id;
            try
            {
                _moonRepository.Add(moon);
                return CreatedAtAction("Get", new { id = moon.Id }, moon);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _moonRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        public IActionResult Update(Moon moon)
        {

            try
            {
                _moonRepository.Update(moon);

                return Ok(moon);
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
