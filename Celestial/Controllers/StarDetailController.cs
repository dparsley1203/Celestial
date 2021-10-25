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
    
    public class StarDetailController : ControllerBase
    {
        private readonly IStarDetailRepository _starDetailRepository;
        private readonly IStarRepository _starRepository;
        private readonly IUserRepository _userRepository;

        public StarDetailController(IStarDetailRepository starDetailRepository, IUserRepository userRepository, IStarRepository starRepository)
        {
            _starDetailRepository = starDetailRepository;
            _starRepository = starRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var currentUserId = GetCurrentUserProfile();
            var starDetail = _starDetailRepository.GetAll();

            return Ok(starDetail);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var currentUserId = GetCurrentUserProfile();
            var starDetails = _starDetailRepository.GetDetailsByStarId(id);

            return Ok(starDetails);
        }

        [HttpPost]
        public IActionResult Post(StarDetail starDetail)
        {
            starDetail.UserId = GetCurrentUserProfile().Id;
            try
            {
                _starDetailRepository.Add(starDetail);
                return CreatedAtAction("Get", new { id = starDetail.Id }, starDetail);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _starDetailRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        public IActionResult Update(StarDetail starDetail)
        {

            try
            {
                _starDetailRepository.Update(starDetail);

                return Ok(starDetail);
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
