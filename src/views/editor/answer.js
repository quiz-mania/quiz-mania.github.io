import {html, render} from '../../lib.js';

const tempate = (answers, questionIndex, correctIndex, addAnswer) => html`
    ${answers.map((x, i) => radioEdit(x, questionIndex, i, correctIndex == i, addAnswer))}
    <div class="editor-input">
        <button @click=${addAnswer} class="input submit action">
            <i class="fas fa-plus-circle"></i>
            Add answer
        </button>
    </div>`;

const radioEdit = (answer, questionIndex, index, isChecked, addAnswer) => html`
<div class="editor-input">

    <label class="radio">
        <input class="input" type="radio" name=${`question-${questionIndex}`} value=${index} ?checked=${isChecked} />
        <i class="fas fa-check-circle"></i>
    </label>

    <input class="input" type="text" name=${`answer-${index}`} .value=${answer} />
    <button data-index=${index} class="input submit action"><i class="fas fa-trash-alt"></i></button>
</div>`;

export function createAnswerList(answers, questionIndex, correctIndex) {
    const current = answers.slice();

    const element = document.createElement('div');
    element.addEventListener('click', onDelete);

    update();

    return element;

    function update() {
        render(tempate(current, questionIndex, correctIndex, addAnswer), element);
    }

    function addAnswer(e) {
        e.preventDefault();
        current.push('');
        update();
    }

    function onDelete(e) {
        let target = e.target;
        while (target != element && target.tagName != 'BUTTON') {
            target = target.parentNode;
        }

        const selectedIndex = target.dataset.index;
        if (selectedIndex != undefined) {
            e.preventDefault();
            current.splice(selectedIndex, 1);
            update();
        }
    }
}