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
    public class StarTypeController : ControllerBase
    {
        private readonly IStarTypeRepository _starTypeRepository;

        public StarTypeController(IStarTypeRepository starTypeRepository)
        {
            _starTypeRepository = starTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var starType = _starTypeRepository.GetAll();

            return Ok(starType);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var starType = _starTypeRepository.GetStarTypeById(id);
            if (starType == null)
            {
                return NotFound();
            }
            return Ok(starType);
        }
    }
}
