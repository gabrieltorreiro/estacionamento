interface Veiculo {
    nome: string,
    placa: string,
    entrada: Date
}


(() => {
    const $ = (query: string): any => document.querySelector(query);

    const patio = {
        ler(): Veiculo[] {
            return JSON.parse(localStorage.getItem('patio') || "[]");
        },
        adicionar(veiculo: Veiculo) {
            this.render(veiculo);
            this.salvar(veiculo);
        },
        salvar(veiculo: Veiculo) {
            localStorage.setItem('patio', JSON.stringify(this.ler().concat(veiculo)));
        },
        remover(placa: string) {
            localStorage.setItem('patio', JSON.stringify(
                this.ler().filter(veiculo => veiculo.placa !== placa)
            ));
            this.renderAll();
        },
        render(veiculo: Veiculo) {
            const entrada = (new Date(veiculo.entrada));
            const elem = document.createElement('tr')
            const remover = this.remover;
            elem.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${entrada.toLocaleDateString('pt-br')} ${entrada.toLocaleTimeString('pt-br')}</td>
                <td><button class="delete" onClick="${function () { remover(veiculo.placa) }}">X</button></td>
            `;
            $('#patio').appendChild(elem);
        },
        renderAll() {
            $('#patio').innerHTML = "";
            this.ler().map(veiculo => {
                this.render(veiculo)
            })
        }
    }

    patio.renderAll();

    $('#adicionar')?.addEventListener('click', () => {
        let nome = $('#nome')?.value
        let placa = $('#placa')?.value

        if (!(nome && placa)) {
            window.alert("Os campos nome e placa devem ser preenchidos.");
            return;
        }

        patio.adicionar({
            nome,
            placa,
            entrada: new Date()
        });

    })
})()