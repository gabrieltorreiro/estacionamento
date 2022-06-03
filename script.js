"use strict";
(() => {
    var _a;
    const $ = (query) => document.querySelector(query);
    const patio = {
        ler() {
            return JSON.parse(localStorage.getItem('patio') || "[]");
        },
        adicionar(veiculo) {
            this.render(veiculo);
            this.salvar(veiculo);
        },
        salvar(veiculo) {
            localStorage.setItem('patio', JSON.stringify(this.ler().concat(veiculo)));
        },
        remover(placa) {
            localStorage.setItem('patio', JSON.stringify(this.ler().filter(veiculo => veiculo.placa !== placa)));
            this.renderAll();
        },
        render(veiculo) {
            const entrada = (new Date(veiculo.entrada));
            const elem = document.createElement('tr');
            const remover = this.remover;
            elem.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${entrada.toLocaleDateString('pt-br')} ${entrada.toLocaleTimeString('pt-br')}</td>
                <td><button class="delete" onClick="${function () { remover(veiculo.placa); }}">X</button></td>
            `;
            $('#patio').appendChild(elem);
        },
        renderAll() {
            $('#patio').innerHTML = "";
            this.ler().map(veiculo => {
                this.render(veiculo);
            });
        }
    };
    patio.renderAll();
    (_a = $('#adicionar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        let nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        let placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!(nome && placa)) {
            window.alert("Os campos nome e placa devem ser preenchidos.");
            return;
        }
        patio.adicionar({
            nome,
            placa,
            entrada: new Date()
        });
    });
})();
