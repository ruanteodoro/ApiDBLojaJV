using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiDBLojaJV.Models
{
    public class Produto
    {
        [Key]
        public int IDProduto { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Valor { get; set; }

        [Required]
        [StringLength(20)]
        public string Unidade { get; set; } = string.Empty;

        public int QuantidadeEstoque { get; set; }
    }
}
