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
    public class MoonDetailController : ControllerBase
    {
        private readonly IMoonDetailRepository _moonDetailRepository;
        private readonly IUserRepository _userRepository;

        public MoonDetailController(IMoonDetailRepository moonDetailRepository, IUserRepository userRepository)
        {
            _moonDetailRepository = moonDetailRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var moonDetails = _moonDetailRepository.GetAll();

            return Ok(moonDetails);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var moonDetails = _moonDetailRepository.GetMoonDetailByMoonId(id);

            return Ok(moonDetails);
        }

        [HttpPost]
        public IActionResult Post(MoonDetail moonDetail)
        {
            moonDetail.UserId = GetCurrentUserProfile().Id;

            try
            {
                _moonDetailRepository.Add(moonDetail);
                return CreatedAtAction("Get", new { id = moonDetail.Id }, moonDetail);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _moonDetailRepository.Delete(id);
            return NoContent();
        }


        [HttpPut]
        public IActionResult Update(MoonDetail moonDetail)
        {

            try
            {
                _moonDetailRepository.Update(moonDetail);

                return Ok(moonDetail);
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
