using System;
using Microsoft.AspNetCore.Mvc;
using Celestial.Repositories;
using Celestial.Models;
using Microsoft.AspNetCore.Authorization;

namespace Celestial.Controllers
{
    /*[Authorize]*/
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{fireBaseId}")]
        public IActionResult GetByFireBaseId(string fireBaseId)
        {
            var userProfile = _userRepository.GetByFireBaseId(fireBaseId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{fireBaseId}")]
        public IActionResult DoesUserExist(string fireBaseId)
        {
            var userProfile = _userRepository.GetByFireBaseId(fireBaseId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

/*        [HttpPost]
        public IActionResult Register(User user)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            user.UserTypeId = UserType.USER_TYPE_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = userProfile.FirebaseUserId }, userProfile);
        }*/

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }
    }
}
