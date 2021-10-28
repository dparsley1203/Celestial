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
    public class ColorController : ControllerBase
    {
        private readonly IColorRepository _colorRepository;

        public ColorController(IColorRepository colorRepository)
        {
            _colorRepository = colorRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var color = _colorRepository.GetAll();

            return Ok(color);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var color = _colorRepository.GetById(id);
            if (color == null)
            {
                return NotFound();
            }
            return Ok(color);
        }
    }
}
