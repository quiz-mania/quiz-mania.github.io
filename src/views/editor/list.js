import { html, render } from '../../lib.js'
import { createQuestion } from './question.js';
const questionList = (questions, addQuestion) => html`
    ${questions}
    
    <article class="editor-question">
        <div class="editor-input">
            <button @click=${addQuestion} class="input submit action">
                <i class="fas fa-plus-circle"></i>
                Add question
            </button>
        </div>
    </article>`;

export function createList(questions) {
    const currentQuestions = questions.map(x => createQuestion(x, removeQuestion));

    const element = document.createElement('div');
    element.className = 'pad-large alt-page';
    update();

    return element;

    function addQuestion() {
        currentQuestions.push(createQuestion({
            text: '',
            answers: [],
            correctIndex: 0
        }, removeQuestion.bind(null, currentQuestions.length)));

        update();
    }

    function update() {
        render(questionList(currentQuestions.map((c, i) => c(i)), addQuestion), element);
    }

    function removeQuestion(index) {
        const confirmed = confirm('Are you shure you want to delete this question?');
        if (confirmed) {
            currentQuestions.splice(index, 1);
            update();
        }

    }
}