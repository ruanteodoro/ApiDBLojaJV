using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ApiDBLojaJV.Models;

namespace ApiDBLojaJV.Models;

public partial class DblojaJvContext : DbContext
{
    public DblojaJvContext()
    {
    }

    public DblojaJvContext(DbContextOptions<DblojaJvContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Idcliente).HasName("PK__cliente__7B86132F57F52DDB");

            entity.ToTable("cliente");

            entity.Property(e => e.Idcliente).HasColumnName("idcliente");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Nome)
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("nome");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Idpedido).HasName("PK__pedido__A9A8E0FA978096EA");

            entity.ToTable("pedido");

            entity.Property(e => e.Idpedido).HasColumnName("idpedido");
            entity.Property(e => e.Descricao)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("descricao");
            entity.Property(e => e.Idcliente).HasColumnName("idcliente");
            entity.Property(e => e.Valor)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("valor");

            entity.HasOne(d => d.IdclienteNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.Idcliente)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__pedido__idclient__38996AB5");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

public DbSet<ApiDBLojaJV.Models.Produto> Produto { get; set; } = default!;
}
