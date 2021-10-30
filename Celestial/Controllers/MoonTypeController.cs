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
    public class MoonTypeController : ControllerBase
    {
        private readonly IMoonTypeRepository _moonTypeRepository;

        public MoonTypeController(IMoonTypeRepository moonTypeRepository)
        {
            _moonTypeRepository = moonTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var moonType = _moonTypeRepository.GetAll();

            return Ok(moonType);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var moonType = _moonTypeRepository.GetMoonTypeById(id);
            if (moonType == null)
            {
                return NotFound();
            }
            return Ok(moonType);
        }
    }
}
