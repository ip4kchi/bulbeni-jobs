const SUPABASE_URL = "https://lzztlondyqncudumjzmb.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6enRsb25keXFuY3VkdW1qem1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzODE5NDUsImV4cCI6MjEwNDk1Nzk0NX0.rKKAKRvD3chzmjIi563xQDOjr7tG_bTusXjJr92dc8Q";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


async function loadJobs() {

    const { data, error } = await supabaseClient
        .from("jobs")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: true });

    if (error) {
        throw error;
    }

    return data || [];
}


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function createWhatsAppLink(job) {

    const message =
`Hello, I would like to apply for:

#${job.reference_code} — ${job.title}
📍 ${job.district}
🎓 ${job.teaching_level}
📚 ${job.lessons_per_week} lessons/week
📅 ${job.days_per_week} days/week
🏫 ${job.teaching_format}

You may find the required documents below.`;

    return (
        "https://api.whatsapp.com/send?phone=905362092947&text=" +
        encodeURIComponent(message)
    );
}


function renderJob(job) {

    return `
        <article class="job-card">

            <div class="job-card-main">

                <div class="job-top">

                    <div>
                        <h3 class="job-title">
                            ${escapeHTML(job.title)}
                        </h3>

                        <div class="job-reference">
                            #${escapeHTML(job.reference_code)}
                        </div>
                    </div>

                    <span class="status-badge">
                        Available
                    </span>

                </div>


                <div class="job-quick-details">

                    <div class="quick-detail">
                        <span class="quick-label">
                            Location
                        </span>

                        <span class="quick-value">
                            ${escapeHTML(job.district)}
                        </span>
                    </div>


                    <div class="quick-detail">
                        <span class="quick-label">
                            Lessons
                        </span>

                        <span class="quick-value">
                            ${escapeHTML(job.lessons_per_week)}/week
                        </span>
                    </div>


                    <div class="quick-detail">
                        <span class="quick-label">
                            Days
                        </span>

                        <span class="quick-value">
                            ${escapeHTML(job.days_per_week)}/week
                        </span>
                    </div>


                    <div class="quick-detail">
                        <span class="quick-label">
                            Lesson
                        </span>

                        <span class="quick-value">
                            ${escapeHTML(job.lesson_duration)} min
                        </span>
                    </div>

                </div>


                <div class="job-content">

                    <aside class="job-sidebar">

                        <div class="info-box">

                            <span class="info-label">
                                Level
                            </span>

                            <span class="info-value">
                                ${escapeHTML(job.teaching_level)}
                            </span>

                        </div>


                        <div class="info-box mint">

                            <span class="info-label">
                                Format
                            </span>

                            <span class="info-value">
                                ${escapeHTML(job.teaching_format)}
                            </span>

                        </div>


                        <div class="info-box application-box">

                            <span class="info-label">
                                Application
                            </span>

                            <span class="info-value">
                                ${escapeHTML(job.requirements)}
                            </span>

                        </div>

                    </aside>

                </div>


                <div class="job-actions">

                    <a
                        href="${escapeHTML(createWhatsAppLink(job))}"
                        class="apply-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apply <span>→</span>
                    </a>

                </div>

            </div>

        </article>
    `;
}


function renderJobs(jobs) {

    const container = document.getElementById("jobs");

    if (!container) {
        return;
    }


    if (jobs.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <h3>
                    No positions available right now
                </h3>

                <p>
                    New English teaching opportunities will appear here.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = jobs
        .map(renderJob)
        .join("");
}


async function initializeJobs() {

    const container = document.getElementById("jobs");

    if (!container) {
        return;
    }


    container.innerHTML = `
        <div class="empty-state">
            <p>Loading available positions...</p>
        </div>
    `;


    try {

        const jobs = await loadJobs();

        renderJobs(jobs);

        console.log(
            "Bulbeni Jobs: loaded",
            jobs.length,
            "available positions from Supabase."
        );

    } catch (error) {

        console.error(
            "Unable to load jobs:",
            error
        );


        container.innerHTML = `
            <div class="empty-state">

                <h3>
                    Unable to load positions
                </h3>

                <p>
                    Please try again shortly.
                </p>

            </div>
        `;
    }
}


document.addEventListener(
    "DOMContentLoaded",
    initializeJobs
);
