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
    public class StarController : ControllerBase
    {
        private readonly IStarRepository _starRepository;
        private readonly IUserRepository _userRepository;

        public StarController(IStarRepository starRepository, IUserRepository userRepository)
        {
            _starRepository = starRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
/*            var currentUserId = GetCurrentUserProfile().Id;*/
            var stars = _starRepository.GetAll();

            return Ok(stars);
        }

        // Returned a null object.  Attempting to 
/*        private User GetCurrentUserProfile()
        {
            var fireBaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFireBaseId(fireBaseId);
        }*/

    }
}
