/**
 * Module to post an error message to a webhook.
 *
 * @param {string} context Description of where the error occurred.
 * @param {Error} error The error object.
 */
export const postToWebhook = async (context: string, error: Error) => {
  const url = process.env.DEBUG_HOOK;

  if (!url) {
    return;
  }

  const embed = {
    title: `There was an error in the ${context}`,
    description: error.message.slice(0, 2000),
    fields: [
      {
        name: "Stack Trace",
        value: `\`\`\`${error.stack?.slice(0, 1000) || "no stack"}\`\`\``,
      },
    ],
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(embed),
  });
};
