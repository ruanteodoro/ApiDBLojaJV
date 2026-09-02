const apiUrl = "/api/produtos";

document.addEventListener(
    "DOMContentLoaded",
    carregarProdutos
);


// LISTAR PRODUTOS
async function carregarProdutos() {

    try {

        const resposta =
            await fetch(apiUrl);

        const produtos =
            await resposta.json();

        const tabela =
            document.getElementById(
                "tabelaProdutos"
            );

        tabela.innerHTML = "";

        produtos.forEach(produto => {

            tabela.innerHTML += `
                <tr>

                    <td>
                        ${produto.idProduto}
                    </td>

                    <td>
                        ${produto.nome}
                    </td>

                    <td>
                        R$ ${Number(produto.valor)
                    .toFixed(2)
                    .replace(".", ",")}
                    </td>

                    <td>
                        ${produto.unidade}
                    </td>

                    <td>
                        ${produto.quantidadeEstoque}
                    </td>

                    <td>

                        <button
                            class="btn-editar"
                            onclick="editarProduto(${produto.idProduto})">

                            Editar

                        </button>

                        <button
                            class="btn-excluir"
                            onclick="excluirProduto(${produto.idProduto})">

                            Excluir

                        </button>

                    </td>

                </tr>
            `;

        });

    }
    catch (erro) {

        console.error(
            "Erro ao carregar produtos:",
            erro
        );

    }
}


// SALVAR PRODUTO
async function salvarProduto() {

    const id =
        document.getElementById(
            "idProduto"
        ).value;

    const produto = {

        idProduto:
            id ? parseInt(id) : 0,

        nome:
            document.getElementById(
                "nome"
            ).value,

        valor:
            parseFloat(
                document.getElementById(
                    "valor"
                ).value
            ),

        unidade:
            document.getElementById(
                "unidade"
            ).value,

        quantidadeEstoque:
            parseInt(
                document.getElementById(
                    "quantidadeEstoque"
                ).value
            )

    };


    if (
        produto.nome === "" ||
        produto.unidade === "" ||
        isNaN(produto.valor) ||
        isNaN(produto.quantidadeEstoque)
    ) {

        alert(
            "Preencha todos os campos."
        );

        return;
    }


    if (id) {

        await fetch(
            `${apiUrl}/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(produto)
            }
        );

        alert(
            "Produto atualizado com sucesso!"
        );

    }
    else {

        await fetch(
            apiUrl,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(produto)
            }
        );

        alert(
            "Produto cadastrado com sucesso!"
        );

    }


    limparFormulario();

    carregarProdutos();
}


// EDITAR PRODUTO
async function editarProduto(id) {

    const resposta =
        await fetch(
            `${apiUrl}/${id}`
        );

    const produto =
        await resposta.json();


    document.getElementById(
        "idProduto"
    ).value =
        produto.idProduto;


    document.getElementById(
        "nome"
    ).value =
        produto.nome;


    document.getElementById(
        "valor"
    ).value =
        produto.valor;


    document.getElementById(
        "unidade"
    ).value =
        produto.unidade;


    document.getElementById(
        "quantidadeEstoque"
    ).value =
        produto.quantidadeEstoque;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// EXCLUIR PRODUTO
async function excluirProduto(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este produto?"
        );


    if (!confirmar)
        return;


    await fetch(
        `${apiUrl}/${id}`,
        {
            method: "DELETE"
        }
    );


    alert(
        "Produto excluído com sucesso!"
    );


    carregarProdutos();

}


// LIMPAR FORMULÁRIO
function limparFormulario() {

    document.getElementById(
        "idProduto"
    ).value = "";

    document.getElementById(
        "nome"
    ).value = "";

    document.getElementById(
        "valor"
    ).value = "";

    document.getElementById(
        "unidade"
    ).value = "";

    document.getElementById(
        "quantidadeEstoque"
    ).value = "";

}