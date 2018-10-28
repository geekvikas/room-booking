using System;  
using System.IdentityModel.Tokens.Jwt;  
using System.Security.Claims;  
using System.Text;  
using Microsoft.AspNetCore.Authorization;  
using Microsoft.AspNetCore.Mvc;  
using Microsoft.Extensions.Configuration;  
using Microsoft.IdentityModel.Tokens;
using RoomBooking.Models;

namespace RoomBooking.Controllers  
{  
    [Route("api/[controller]")]  
    [ApiController]  
    public class LoginController : Controller  
    {  
        private IConfiguration _config;  
  
        public LoginController(IConfiguration config)  
        {  
            _config = config;  
        }  
        [AllowAnonymous]  
        [HttpPost]  
        public IActionResult Login([FromBody] User login)  
        {  
            IActionResult response = Unauthorized();  
            var user = AuthenticateUser(login);  
  
            if (user != null)  
            {  
                var tokenString = GenerateJSONWebToken(user);  
                response = Ok(new { token = tokenString });  
            }  
  
            return response;  
        }  
  
        private string GenerateJSONWebToken(User userInfo)  
        {  
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));  
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);  
  
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],  
              _config["Jwt:Issuer"],  
              null,  
              expires: DateTime.Now.AddMinutes(120),  
              signingCredentials: credentials);  
  
            return new JwtSecurityTokenHandler().WriteToken(token);  
        }  
  
        private User AuthenticateUser(User login)  
        {  
            User user = null;  
  
            //Validate the User Credentials  
            //Demo Purpose, I have Passed HardCoded User Information  
            if (user.Username == "Jappe")  
            {  
                user = new User { Username = "Joppe" };  
            }  
            return user;  
        }  
    }  
}  