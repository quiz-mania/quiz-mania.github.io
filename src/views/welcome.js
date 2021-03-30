import { html , styleMap, topics} from '../lib.js';
import { getQuizes, getSolutionsByQuizId, getQuizById} from '../api/data.js'

const template = (style, topicsCount, quizesCount, mostPopularQuizSolutions, mostPopularQuiz) => html`
<section id="welcome">

    <div class="hero layout">
        <div class="splash right-col"><i class="fas fa-clipboard-list"></i></div>
        <div class="glass welcome">
            <h1>Welcome to Quiz Mania!</h1>
            <p>Home to ${quizesCount} quizes in ${topicsCount} topics. <a href="/browse">Browse all quizes</a>.</p>
            <a style=${styleMap(style)} class="action cta" href="/login">Sign in to create a quiz</a>
        </div>
    </div>

    <div class="pad-large alt-page">
        <h2>Our most recent quiz:</h2>

        <article class="preview layout">
            <div class="right-col">
                <a class="action cta" href="/details/${mostPopularQuiz.objectId}">View Quiz</a>
            </div>
            <div class="left-col">
                <h3>${mostPopularQuiz.title}</h3>
                <span class="quiz-topic">Topic: ${mostPopularQuiz.topic}</span>
                <div class="quiz-meta">
                    <span>${mostPopularQuiz.questionCount} questions</span>
                    <span>|</span>
                    <span>Taken ${mostPopularQuizSolutions} times</span>
                </div>
            </div>
        </article>

        <div>
            <a class="action cta" href="/browse">Browse all quizes</a>
        </div>
    </div>

</section>`;

export async function welcomePage(ctx) {
    let style = {
        display: 'block'
    };
    if (sessionStorage.getItem('userId') != null) {
        style = {display: 'none'};
    }

    const topicsCount = [...Object.entries(topics)].length;
    const allQuizes = await getQuizes();
    const quizesCount = allQuizes.length;
    const quiz = allQuizes.sort((a,b) => b.createdAt.localeCompare(a.createdAt))[0];
    const quizId = quiz.objectId;
    const mostPopularQuiz = await getQuizById(quizId);
    const solutionsCount = [...await getSolutionsByQuizId(quizId)].length;
    ctx.render(template(style, topicsCount, quizesCount, solutionsCount, mostPopularQuiz));
}