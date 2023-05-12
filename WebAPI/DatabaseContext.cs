﻿using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = default!;
    }
}
