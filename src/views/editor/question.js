import { html, render } from '../../lib.js'
import { createAnswerList } from './answer.js';

const viewTemplate = (question, index, onEdit, onDelete) => html`
<div class="layout">
    <div class="question-control">
        <button @click=${onEdit} class="input submit action"><i class="fas fa-edit"></i> Edit</button>
        <button @click=${()=> onDelete(index)} class="input submit action"><i class="fas fa-trash-alt"></i>
            Delete</button>
    </div>
    <h3>Question ${index + 1}</h3>
</div>
<div>
    <p class="editor-input">${question.text}</p>
    ${question.answers.map((x, i) => radioView(x, question.correctIndex == i))}
</div>`;

const radioView = (answer, isChecked) => html`
<div class="editor-input-view">
    <label class="radio">
        <input class="input" type="radio" disabled ?checked=${isChecked} />
        <i class="fas fa-check-circle"></i>
    </label>
    <span>${answer}</span>
</div>`;

const editorTemplate = (question, index, onCancel, onSave) => html`
<div class="layout">
    <div class="question-control">
        <button @click=${onSave} class="input submit action"><i class="fas fa-check-double"></i>
            Save</button>
        <button @click=${onCancel} class="input submit action"><i class="fas fa-times"></i> Cancel</button>
    </div>
    <h3>Question ${index + 1}</h3>
</div>
<form>
    <textarea class="input editor-input editor-text" name="text" placeholder="Enter question"
        .value=${question.text}></textarea>
    ${createAnswerList(question, index)}
</form>`;


//<div class="loading-overlay working"></div>

export function createQuestion(question, removeQuestion) {
    let currentQuestion = copyQuestion(question)

    let index = 0;
    let editorActive = false;
    const element = document.createElement('article');
    element.className = 'editor-question';

    return update;

    showView();

    function onEdit() {
        editorActive = true;
        showEditor();
    }

    // async function onDelete(){
    //     const confirmed = confirm('Are you shure you want to delete this question?');
    //     if (confirmed) {
    //         element.remove();
    //     }
    // }

    async function onSave() {
        const formData = new FormData(element.querySelector('form'));
    }

    function onCancel() {
        editorActive = false;
        currentQuestion = copyQuestion(question);
        showView();
    }

    function showView() {
        render(viewTemplate(currentQuestion, index, onEdit, removeQuestion), element);
    }

    function showEditor() {
        render(editorTemplate(currentQuestion, index, onCancel, onSave), element);
    }

    function update(newIndex) {
        index = newIndex;
        if (editorActive) {
            showEditor();
        }
        else {
            showView();
        }

        return element;
    }
}

function copyQuestion(question) {
    const currentQuestion = Object.assign({}, question);
    currentQuestion.answers = currentQuestion.answers.slice();

    return currentQuestion;
}