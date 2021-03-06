import { html, styleMap } from "../../lib.js";
import { getSolutionsByQuizId, getQuizById } from '../../api/data.js';

const template = (onClick, quizDetails, solutionsCount, style) => html`
<section id="details">
    <div class="pad-large alt-page">
        <article class="details">
            <h1>${quizDetails.title}</h1>
            <span class="quiz-topic">A quiz by <a href="#">${quizDetails.owner.username}</a> on the topic of ${quizDetails.topic}</span>
            <div class="quiz-meta">
                <span>${quizDetails.questionCount} Questions</span>
                <span>|</span>
                <span>Taken ${solutionsCount} times</span>
            </div>
            <p class="quiz-desc">${quizDetails.description}</p>

            <div>
                <a @click=${onClick} class="cta action" href="javascript:void(0)" >Begin Quiz</a>
                <a style=${styleMap(style)} class="cta action" href="/edit/${quizDetails.objectId}" >Edit Quiz</a>
            </div>

        </article>
    </div>
</section>`;


export async function detailsPage(ctx) {
    const isLogedIn = sessionStorage.getItem('userId') != null
    const quizId = ctx.params.id;
    const solutionsCount = (await getSolutionsByQuizId(quizId)).length;
    const quizDetails = await getQuizById(quizId);
    const style = {
        display: (sessionStorage.getItem('userId') != null && quizDetails.owner.objectId == sessionStorage.getItem('userId')) ? 'block' : 'none'
    }
    
    ctx.render(template(onClick, quizDetails, solutionsCount, style));
    
    function onClick(){
        if (isLogedIn) {
            ctx.redirect(`/quiz/${quizId}`)
        }
        else{
            return alert('You have to Sign in first!')
        }
    }
}
