// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

// capture user IDs followed by ++
app.message(/<@\w+>\s?\+{2,6}/g, async ({context, say}) => {
    context.matches.forEach(async match => {
        const [_, name, pluses] = match.match(/<@(\w+)>\s?(\++)/);
        const points = pluses.length - 1;

        await say(`_<@${name}> gained ${points} kudos_`)
    });
});

(async () => {
    // Start the app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
