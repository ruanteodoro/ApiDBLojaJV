using System;
using System.Collections.Generic;

namespace ApiDBLojaJV.Models;

public partial class Pedido
{
    public int Idpedido { get; set; }

    public string Descricao { get; set; } = null!;

    public decimal Valor { get; set; }

    //Referencia com chave estrangeira para a tabela cliente
    public int? Idcliente { get; set; }

    public virtual Cliente? IdclienteNavigation { get; set; }
}
