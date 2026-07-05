# ⚔️ Bootstrap vs. Tailwind CSS — comparativo dos fundamentos

Ambos são **frameworks CSS**: bibliotecas prontas para você estilizar páginas
sem escrever todo o CSS do zero. Mas eles partem de **filosofias opostas**.
Entender essa diferença é mais importante do que decorar classes.

> 📂 Nesta pasta: [`bootstrap.html`](./bootstrap.html) e
> [`tailwind.html`](./tailwind.html) mostram **os mesmos componentes** feitos
> nos dois frameworks. Abra os dois lado a lado enquanto lê este comparativo.

---

## 🧠 A diferença central: "componentes" vs. "utilitários"

### Bootstrap → *Component-first* (componentes prontos)
Você recebe peças **inteiras e já estilizadas**. Poucas classes, alto nível.

```html
<button class="btn btn-primary">Clique aqui</button>
```
> "btn btn-primary" = um botão azul completo, pronto para usar.

### Tailwind → *Utility-first* (utilitários primeiro)
Você recebe **pecinhas mínimas** e monta o componente você mesmo.

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Clique aqui
</button>
```
> Cada classe faz UMA coisa: cor de fundo, cor do texto, padding, cantos, hover.

---

## 📊 Tabela comparativa

| Aspecto | 🅱️ Bootstrap | 🌬️ Tailwind CSS |
|---|---|---|
| **Filosofia** | Componentes prontos | Utilitários que você compõe |
| **Quantidade de classes no HTML** | Poucas | Muitas |
| **Aparência padrão** | "Cara de Bootstrap" (reconhecível) | Neutra — vira o que você fizer |
| **Curva de aprendizado** | Rápida no começo | Exige decorar utilitários |
| **Personalização** | Precisa sobrescrever/customizar temas | Nativa — você já monta do seu jeito |
| **JavaScript incluso** | Sim (navbar, modal, dropdown, carrossel…) | Não (só CSS; JS fica por sua conta) |
| **Grid** | Fixo, de **12 colunas** (`col-6`) | CSS Grid cru (`grid-cols-2`, flexível) |
| **Tamanho final do CSS** | Arquivo grande e único | Enxuto: o build gera só o que você usa |
| **Melhor para** | Prototipar rápido, times que querem padrão | Design próprio, controle fino do visual |

---

## 🔍 Mesma tarefa nos dois — "um card"

**Bootstrap** (componente `card`):
```html
<div class="card p-3">
  <h5 class="card-title">Título</h5>
  <p class="card-text">Conteúdo...</p>
</div>
```

**Tailwind** (composto por utilitários):
```html
<div class="bg-white rounded-lg shadow p-4">
  <h5 class="font-semibold mb-1">Título</h5>
  <p class="text-gray-500 text-sm">Conteúdo...</p>
</div>
```

Note o padrão: no Bootstrap você **usa** um card; no Tailwind você **desenha** um.

---

## ✅ Quando escolher cada um?

**Escolha Bootstrap quando:**
- Você quer algo bonito e funcional **rápido**, sem pensar muito em design.
- Precisa de componentes interativos (modal, carrossel) **sem escrever JS**.
- O time valoriza um padrão visual consistente e conhecido.

**Escolha Tailwind quando:**
- Você quer um **visual único**, que não pareça "template pronto".
- Precisa de **controle fino** sobre cada detalhe de espaçamento/cor.
- Não se importa de ter muitas classes no HTML em troca de liberdade.

> 💡 **Não são inimigos.** Muitos projetos usam Tailwind como base de estilo e
> puxam um componente pontual de outra biblioteca. E existe até quem combine os
> dois — embora misturar as duas filosofias no mesmo elemento (como no arquivo
> original deste estudo) costume gerar confusão. O ideal é **escolher um** por
> projeto.

---

## ⚙️ Como instalar cada um (fundamentos)

### Bootstrap (via CDN — o jeito mais simples)
```html
<!-- no <head>: o CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- no fim do <body>: o JS (o bundle já inclui o Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Tailwind (Play CDN — só para estudo/protótipo)
```html
<script src="https://cdn.tailwindcss.com"></script>
```
> ⚠️ Em **produção**, o Tailwind é instalado via npm com um passo de *build* que
> gera só o CSS das classes usadas. O Play CDN é apenas para aprender rápido.

---

## 🔗 Documentação oficial

| | Bootstrap | Tailwind CSS |
|---|---|---|
| **Site** | https://getbootstrap.com/ | https://tailwindcss.com/ |
| **Introdução** | https://getbootstrap.com/docs/5.3/getting-started/introduction/ | https://tailwindcss.com/docs/installation |
| **Componentes/Utilitários** | https://getbootstrap.com/docs/5.3/components/ | https://tailwindcss.com/docs |
| **Grid/Layout** | https://getbootstrap.com/docs/5.3/layout/grid/ | https://tailwindcss.com/docs/grid-template-columns |
